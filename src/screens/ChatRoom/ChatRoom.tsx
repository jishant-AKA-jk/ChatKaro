import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import CText from '../../common-components/CText';
import {useStyles, useTheme} from '../../context/ThemeContext';
import {ChatRoomStyles} from './ChatRoomStyles';
import {SOCKET_EVENTS, SVG_ICONS, TEXT_TYPE} from '../../utils/Enums';
import CSvgIcons from '../../common-components/CSvgIcons';
import {CStyles} from '../../theme/CStyles';
import CKeyboardAvoidingView from '../../common-components/CKeyboardAvoidingView';
import CTextInput from '../../common-components/CTextInput';
import {
  getChatMessages,
  IChat,
  IChatMessage,
  transformChatData,
} from './ChatRoomController';
import CLoader from '../../common-components/CLoader';
import {IChatRoom} from '../RoomList/RoomList';
import {showToast} from '../../utils/appfunctions';
import {useFocusEffect} from '@react-navigation/native';
import ChatMessages from './ChatMessages';
import {useSocket} from '../../components/useSocket';

const ChatScreen = ({route, navigation}: any) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const st = useStyles(ChatRoomStyles);
  const {theme} = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const chatRoomDetails: IChatRoom = route?.params?.chatRoomDetails ?? null;
  const {socket, send, disconnect, setRoomId} = useSocket(chatRoomDetails.id);

  useFocusEffect(
    useCallback(() => {
      setRoomId(chatRoomDetails.id);
      return () => {
        disconnect();
      };
    }, [chatRoomDetails, setRoomId, disconnect]),
  );

  useEffect(() => {
    setRoomId(chatRoomDetails.id);
  }, []);

  const handleIncomingMessage = useCallback((data: any) => {
    if (data?.event === SOCKET_EVENTS.MESSAGE) {
      setChatMessages(prevMessages => [...prevMessages, data.message]);
    } else if (
      data?.event === SOCKET_EVENTS.JOIN ||
      data?.event === SOCKET_EVENTS.LEAVE
    ) {
      setChatMessages(prevMessages => [
        ...prevMessages,
        {event: data?.event, username: data?.username},
      ]);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = event => {
      try {
        const parsedData = JSON.parse(event.data);
        handleIncomingMessage(parsedData);
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket, handleIncomingMessage]);

  const sendMessage = () => {
    if (message.length === 0) return;
    send(message.trim());
    setMessage('');
    setTimeout(() => {
      flatListRef?.current?.scrollToEnd();
    }, 300);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    setLoading(true);
    try {
      if (!chatRoomDetails) {
        showToast('Chat Room not found');
        return;
      }
      const res: IChatMessage[] = await getChatMessages(
        chatRoomDetails.id.toString(),
      );
      if (res) {
        const chatdata = transformChatData(res.reverse());
        setChatMessages(chatdata);
        setTimeout(() => {
          flatListRef?.current?.scrollToEnd();
        }, 200);
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  const renderChatRoomItem = useCallback((props: {item: any}) => {
    return <ChatMessages item={props.item} />;
  }, []);

  const isOnlyJoinMessages = useMemo(() => {
    return !chatMessages.some(
      item => !('event' in item && item.event === 'join'),
    );
  }, [chatMessages]);

  return (
    <CKeyboardAvoidingView>
      <CLoader isLoading={loading}>
        <View style={st.container}>
          <View style={[st.headers]}>
            <TouchableOpacity
              onPress={() => {
                disconnect();
                navigation.goBack();
              }}>
              <CSvgIcons name={SVG_ICONS.BackIcon} size={26} />
            </TouchableOpacity>
            <CText
              style={CStyles.paddingHorizontalBase}
              numberOfLines={1}
              textType={TEXT_TYPE.PageTitle}>
              {chatRoomDetails.name}
            </CText>
          </View>
          <FlatList
            ref={flatListRef}
            data={chatMessages}
            keyExtractor={(item, index) => item?.id ?? index}
            renderItem={renderChatRoomItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={'interactive'}
            onContentSizeChange={scrollToEnd}
            contentContainerStyle={CStyles.paddingMd}
          />
          {isOnlyJoinMessages && (
            <View style={st.noChatView}>
              <CText textType={TEXT_TYPE.SectionTitle}>
                NO messages here, Be the first One!!
              </CText>
            </View>
          )}
          <View style={st.inputContainer}>
            <CTextInput
              autoFocus
              style={st.textInput}
              placeholderText="Chat Karo..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity
              style={st.sendButton}
              onPress={sendMessage}
              disabled={message?.length === 0}>
              <CSvgIcons
                size={22}
                name={SVG_ICONS.SendIcon}
                color={theme.text_on_primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </CLoader>
    </CKeyboardAvoidingView>
  );
};

export default ChatScreen;
