import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useStyles, useTheme} from '../../context/ThemeContext';
import {signinStyles} from './SigninStyles';
import CSvgIcons from '../../common-components/CSvgIcons';
import {SVG_ICONS, TEXT_TYPE} from '../../utils/Enums';
import CTextInput from '../../common-components/CTextInput';
import {CStyles} from '../../theme/CStyles';
import CButton from '../../common-components/CButton';
import {useAuth} from '../../context/AuthContext';
import CText from '../../common-components/CText';
import CKeyboardAvoidingView from '../../common-components/CKeyboardAvoidingView';
import {setUsername} from './signInUserController';
import {isExpiredUser, showToast} from '../../utils/appfunctions';
import {SOMETHING_WENT_WRONG, WELCOME_TO_APP} from '../../utils/appConstants';

export default function SignIn() {
  const [textInputVal, setTextInputVal] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, showError] = useState('');
  const {login} = useAuth();
  const {theme} = useTheme();
  const st = useStyles(signinStyles);
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      if (textInputVal.length < 3) {
        showError('Username must be min of 3 characters');
      } else if (textInputVal.length > 50) {
        setTextInputVal('');
        showError('Username must be max of 50 characters');
      } else {
        const res = await setUsername({username: textInputVal});
        const isExpired = isExpiredUser(res?.expires_at);
        if (res && !isExpired) {
          showToast(WELCOME_TO_APP);
          login(res);
        } else if (isExpired) {
          showError('Username hase been expired , try new username');
        }
      }
    } catch (e: any) {
      showToast(SOMETHING_WENT_WRONG);
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <CKeyboardAvoidingView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={st.container}>
            <CSvgIcons
              height={85}
              style={{marginTop: 80}}
              width={180}
              name={SVG_ICONS.ChatKaroAppIcon}
              color={theme.primary}
            />
            <CText style={st.tagline}>
              Login now to{' '}
              <CText textType={TEXT_TYPE.SectionTitle}>Chat Karo</CText>
            </CText>
            <View style={st.input}>
              <CTextInput
                autoFocus
                value={textInputVal}
                ref={inputRef}
                placeholderText={'Enter your username'}
                onChangeText={setTextInputVal}
              />
              {error.length > 0 && (
                <CText textType={TEXT_TYPE.ErrorText}>{error}</CText>
              )}
            </View>
            <CButton
              title={`Let's chat`}
              disabled={textInputVal?.length == 0}
              onPress={() => handleSubmit()}
              loading={loading}
            />
          </View>
        </ScrollView>
      </CKeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
