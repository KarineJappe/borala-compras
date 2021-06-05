import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { deleteUser } from '../../utils/asyncStorage';
import { getEstabelecimentoById_user } from '../../services/estabelecimento';

const MenuLojista = ({ route, navigation }) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleEditarEstabeleciemnto = async () => {
        const { data } = await getEstabelecimentoById_user(route.params.user.id);
        closeMenu();
        navigation.navigate('Cadastro', {
            user: route.params.user,
            estabelecimento: data
        });
    }
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <Menu
                style={{
                    marginTop: 40
                }}
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Appbar.Action icon={'dots-vertical'} onPress={openMenu} />}>
                <Menu.Item onPress={
                    handleEditarEstabeleciemnto
                } title="Editar Estabelecimento" />
                <Divider />
                <Menu.Item onPress={() => (
                    deleteUser().then(() => {
                        closeMenu();
                        navigation.navigate('Login');
                    })
                )} title="Sair" />
            </Menu>
        </View>
    );
};

export default MenuLojista;