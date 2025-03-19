import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import CText from '../../common-components/CText';
import {STACK_SCREENS, SVG_ICONS, TEXT_TYPE} from '../../utils/Enums';
import {useStyles, useTheme} from '../../context/ThemeContext';
import {roomListStyles} from './RoomListStyles';
import CSvgIcons from '../../common-components/CSvgIcons';
import {CStyles} from '../../theme/CStyles';
import {createChatRooms, getChatRooms} from './RoomListController';
import CButton from '../../common-components/CButton';
import {useAuth} from '../../context/AuthContext';
import CLoader from '../../common-components/CLoader';
import CTextInput from '../../common-components/CTextInput';
import CBottomModal from '../../common-components/CBottomModal';
import RoomCard from './RoomCard';

export interface IChatRoom {
  id: string;
  name: string;
  created_at?: string | Date;
  expires_at?: string | Date;
}

const ChatRoomsList = ({navigation}: any) => {
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);
  const [filteredChatRooms, setFilteredChatRooms] = useState<IChatRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState('');
  const [roomName, setRoomName] = useState('');
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const st = useStyles(roomListStyles);
  const {logout} = useAuth();
  const {theme} = useTheme();
  const listRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    getAllChatRooms();
  }, []);

  useEffect(() => {
    if (searchVal.length > 0) {
      searchChatRoom();
    } else {
      setFilteredChatRooms(chatRooms);
    }
  }, [searchVal]);

  const getAllChatRooms = async () => {
    setLoading(true);
    try {
      const rooms: IChatRoom[] = await getChatRooms();
      if (rooms && rooms.length > 0) {
        setChatRooms(rooms.reverse());
        setFilteredChatRooms(rooms);
        setSearchVal('');
      }
    } catch (e: any) {
      console.log(e);
    }
    setLoading(false);
  };

  const searchChatRoom = () => {
    const filteredData = chatRooms.filter(
      room => room.name.toLowerCase().search(searchVal.toLowerCase()) !== -1,
    );
    setFilteredChatRooms(filteredData);
  };

  const handleChatRoomPress = (chatRoom: IChatRoom) => {
    navigation.navigate(STACK_SCREENS.ChatScreen, {chatRoomDetails: chatRoom});
  };

  const renderChatRoomItem = useCallback(
    (props: {item: IChatRoom; index: number}) => {
      return (
        <RoomCard
          item={props.item}
          index={props.index}
          handleChatRoomPress={chatroom => handleChatRoomPress(chatroom)}
        />
      );
    },
    [],
  );

  const showRoomCreationModal = () => {
    setShowCreateRoomModal(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 300);
  };

  const onCreateRoom = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const res = await createChatRooms({name: roomName});
      if (res) {
        navigation.navigate(STACK_SCREENS.ChatScreen, {chatRoomDetails: res});
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setShowCreateRoomModal(false);
      setRoomName('');
    }
  };

  return (
    <View style={st.container}>
      <View style={st.header}>
        <View style={st.headerIcon}>
          <CSvgIcons
            name={SVG_ICONS.ChatKaroAppIcon}
            color={theme.primary}
            size={70}
          />
          <View>
            <CText style={st.chat}>Chat</CText>
            <CText style={st.karo}>{'   '}Karo</CText>
          </View>
        </View>
        <TouchableOpacity onPress={logout}>
          <CSvgIcons color={theme.text_primary} name={SVG_ICONS.LogoutIcon} />
        </TouchableOpacity>
      </View>
      <CLoader isLoading={loading}>
        <View style={CStyles.paddingHorizontalMd}>
          {chatRooms.length > 0 && !showSearch ? (
            <View style={st.sectionHeader}>
              <CText
                textType={TEXT_TYPE.SectionTitle}
                style={{textTransform: 'none'}}>
                Tap to join any Chat Room
              </CText>
              <TouchableOpacity onPress={() => setShowSearch(true)}>
                <CSvgIcons
                  color={theme.text_primary}
                  name={SVG_ICONS.SearchIcon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={st.sectionHeader}>
              <CTextInput
                autoFocus
                value={searchVal}
                inputStyle={{width: '90%'}}
                onChangeText={setSearchVal}
                placeholderText={'Enter room name'}
              />
              <Pressable
                onPress={() => {
                  setShowSearch(false);
                  setSearchVal('');
                }}>
                <CSvgIcons
                  color={theme.text_primary}
                  name={SVG_ICONS.CloseIcon}
                  size={24}
                />
              </Pressable>
            </View>
          )}

          <FlatList<IChatRoom>
            data={filteredChatRooms}
            ref={listRef}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets={true}
            refreshing={loading}
            keyExtractor={item => item.id.toString()}
            renderItem={renderChatRoomItem}
            style={{marginBottom: 100}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={st.chatRoomsContainer}
            ListEmptyComponent={
              <View style={st.noChatAvilable}>
                <CText textType={TEXT_TYPE.SectionTitle}>
                  No Chat Room Found
                </CText>
                <CButton
                  title="Create chat room"
                  onPress={showRoomCreationModal}
                  buttonStyle={st.noChatJoinButton}
                />
              </View>
            }
            onRefresh={getAllChatRooms}
          />
        </View>
        {filteredChatRooms.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={showRoomCreationModal}
            style={st.addRoomButton}>
            <CSvgIcons
              name={SVG_ICONS.AddIcon}
              color={theme.primary}
              size={36}
              style={{zIndex: 10}}
            />
          </TouchableOpacity>
        )}
        <CBottomModal
          containerStyle={{flex: 1}}
          visible={showCreateRoomModal}
          onClose={() => setShowCreateRoomModal(false)}
          onConfirm={onCreateRoom}>
          <CText
            style={CStyles.paddingVerticalBase}
            textType={TEXT_TYPE.PageTitle}>
            Create your own chat room
          </CText>
          <CTextInput
            isInModal={true}
            ref={inputRef}
            autoFocus
            style={{height: 50}}
            value={roomName}
            onChangeText={setRoomName}
            placeholderText={'Enter room name'}
          />
        </CBottomModal>
      </CLoader>
    </View>
  );
};

export default ChatRoomsList;
