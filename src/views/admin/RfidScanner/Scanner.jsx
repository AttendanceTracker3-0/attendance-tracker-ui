/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import {
    Box,
    FormLabel,
    Input,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import { getCardRefId } from 'utils/api/ScanCardRfid';
import { ToastContainer, toast } from 'react-toastify';

const Scanner = () => {
    const { t } = useTranslation();

    const showSuccess = (message) => {
        toast.success(message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showError = (message) => {
        toast.error(message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const [textInput, setTextInput] = useState('');

    const [debouncedTextInput, setDebouncedTextInput] = useState('');

    const AddCheckin = async (id) => {
        try {
            const res = await getCardRefId(id);
            if (res.status == 200) {
                showSuccess(t('scanner:success'));
            }
        } catch (err) {
            if (err.response.status === 2202) {
                showError(t('scanner:card_does_not_exist'));
            } else {
                showError(t('scanner:failed'));
            }
        }
        finally{
            setTextInput('');
        }
    };

    useEffect(() => {
        if (debouncedTextInput) {
            AddCheckin(debouncedTextInput);
        }
    }, [debouncedTextInput]);

    // Debounce the input changes to avoid multiple API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedTextInput(textInput);
        }, 300); // Adjust the delay as needed

        return () => clearTimeout(timeoutId);
    }, [textInput]);

    return (
        <>
            <Box marginTop="80px">
                <ToastContainer />
                <Box
                    marginTop="20%"
                    marginLeft="10%"
                    height="110px"
                    width="70%"
                    backgroundColor="white"
                    borderRadius="3%"
                >
                    <FormLabel marginLeft="41%" paddingTop="1%">
                        {t('scanner:name')}
                    </FormLabel>
                    <Input
                        type='text'
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        marginTop="1%"
                        marginLeft="23%"
                        width="50%"
                        autoFocus
                    />
                </Box>
            </Box>
        </>
    );
}

export default Scanner;
