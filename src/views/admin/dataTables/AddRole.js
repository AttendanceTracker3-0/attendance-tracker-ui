import React, { useState } from 'react';
import {
    Button, Flex, Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { toast, ToastContainer } from 'react-toastify';
import { addRole } from 'utils/api/Modules';
import { useTranslation } from 'react-i18next';

const AddRole = ({
    reloadWorkPositions, isOpenModal, onCloseModal
}) => {
    const [roleName, setRoleName] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    const { t } = useTranslation();

    const showSuccess = (successMessage) => {
        toast.success(successMessage, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const showError = (errorrMessage) => {
        toast.error(errorrMessage, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const validation = () => {
        if (!roleName) {
            showError(t('roles:fill_input'));
            setDisableButton(false);
            return false;
        }
        return true;
    };
    const onSubmit = (e) => {
        setDisableButton(true);
        e.preventDefault();
        const payload = {
            Name: roleName
        };
        if (!validation()) return;
        addRole(payload)
            .then(() => {
                showSuccess(t('roles:inserted'));
                onCloseModal();
                setRoleName('');
                setDisableButton(false);
                reloadWorkPositions();
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    showError(t('roles:role_existed'));
                    setDisableButton(false);
                    setRoleName('');
                } else if (err.response.status === 421) {
                    showError(t('roles:not_inserted'));
                    setDisableButton(false);
                } else {
                    showError('error from Back-End');
                    setDisableButton(false);
                }
            });
    };
    return (
        <Modal isOpen={isOpenModal} onClose={onCloseModal} colorScheme="brandScheme">
            <ModalOverlay />
            <ToastContainer />
            <ModalContent colorScheme="brandScheme">
                <Card>
                    <ModalHeader>
                        {t('roles:button_add_role')}
                    </ModalHeader>
                    <ModalCloseButton />
                    <form>
                        <ModalBody>

                            <Flex flexDirection="column" alignItems="center">
                                <FormLabel htmlFor="invoicers" marginTop="10px">
                                    {t('roles:text_role_input')}
                                </FormLabel>
                                <Input
                                    type="text"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                />
                            </Flex>

                        </ModalBody>
                    </form>
                    <ModalFooter justifyContent="center">
                        <Button type="submit" disabled={disableButton} onClick={onSubmit} background="teal" width="100%" borderRadius="9px" color="white">
                            {t('roles:button_add_role')}
                        </Button>
                    </ModalFooter>
                </Card>

            </ModalContent>
        </Modal>
    );
};
export default AddRole;
