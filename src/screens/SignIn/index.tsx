import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { GameController } from 'phosphor-react-native';
import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';

export function SignIn() {
  const [dataUser, setDataUser] = useState({
    avatar: '',
    id: '',
    username: '',
    discriminator: '',
  });
  const navigation = useNavigation();

  async function handleDiscordSignIn() {
    const response = await AuthSession.startAsync({
      authUrl:
        'https://discord.com/api/oauth2/authorize?client_id=1022647992576114718&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40luisadev%2Fmobile&response_type=token&scope=identify',
    });

    fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `Bearer ${response.params.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setDataUser({
          avatar: data.avatar,
          id: data.id,
          username: data.username,
          discriminator: data.discriminator,
        })
      );

    navigation.navigate('home');
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading title='Entrar' subtitle='Encontre seu duo e bora jogar' />

        <TouchableOpacity style={styles.button} onPress={handleDiscordSignIn}>
          <GameController color={THEME.COLORS.TEXT} size={20} />

          <Text style={styles.buttonTitle}>Entrar com Discord</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  );
}
