import { WebBundlr } from '@bundlr-network/client';
import React, { useContext, useEffect, useState } from 'react';
import { ProviderContext } from './provider';
import { useToast } from '@chakra-ui/react';

export const BundlrContext = React.createContext();

const BundlrContext = ({children}) => {
    const toast = useToast();
    const [bundlrInstance, setBundlrInstance] = useState();
    //const [balance, setBalance] = useState('');
    //const [cost, setCost] = useState('');

    useEffect(() => {
        if (bundlrInstance) {
            fetchBalance();
        }
    }, [bundlrInstance])

    const initializeBundlr = async () => {
        const [provider, _] = useContext(ProviderContext);
        const bundlr = new WebBundlr(
            "https://devnet.bundlr.network",
            "solana",
            provider,
            {
                providerUrl: "https://api.devnet.solana.com"
            }
        );
        await bundlr.ready();
        setBundlrInstance(bundlr);
    }

    async function fundWallet(amount) {
        try {
            if(bundlrInstance) {
                if (!amount) return
                const amountParsed = parseInput(amount);
                if (amountParsed) {
                    toast({
                        title: "Adding fund please wait",
                        status: "loading"
                    });
                    let response = await bundlrInstance.fund(amountParsed);
                    console.log('Wallet funded: ', response);
                    toast({
                        title: "Funds added",
                        status: "success"
                    })
                }
                fetchBalance()
            }
        } catch (error) {
            console.log("error", error);
            toast({
                title: error.message || "Something went wrong!",
                status: "error"
            })
        }
    }

    function parseInput(input) {
        const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
        if (conv.isLessThan(1)) {
            console.log('error: value too small')
            toast({
                title: "Error: value too small",
                status: "error"
            })
            return
        } else {
            return conv
        }
    }

    async function fetchBalance() {
        if (bundlrInstance) {
            const balance = await bundlrInstance.getLoadedBalance();
            const converted = bundlr.utils.unitConverter(balance)
            console.log("bal: ", converted);
            setBalance(converted);
        }
    }

    async function calculateCost(size) {
        if (bundlrInstance) {
            const cost = await bundlrInstance.getPrice(size);
        }
    }

    async function uploadFile(file, filetype) {
        try {
            let tx = await bundlrInstance.uploader.upload(file, [{ name: "Content-Type", value: filetype }]);
            const size = tx.size;
            const cost = await calculateCost(size);
            const balance = await fetchBalance();
            if(cost.isGreaterThan(balance)) {
                await fundWallet(balance.minus(price).multipliedBy(1.1))
            }
            return tx;
        } catch (error) {
            toast({
                title: error.message || "Something went wrong!",
                status: "error"
            })
        }
    }

    return (
        <BundlrContext.Provider value={{ initializeBundlr, fundWallet, uploadFile, bundlrInstance}}>
            {children}
        </BundlrContext.Provider>
    )
}

export default BundlrContext;

export const useBundlr = () => {
    return useContext(BundlrContext);
}



