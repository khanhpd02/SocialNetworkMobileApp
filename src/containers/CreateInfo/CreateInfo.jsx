import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { imagesDataURL } from "../../constants/data";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {decode }  from 'react-native-base64';
import { setAuthToken, api} from "../../utils/helpers/setAuthToken"
const CreateInfoScreen = ({ navigation }) => {
  //
  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [name, setName] = useState("Melissa Peters");

  const [FullName, setFullName] = useState("");
const [NickName, setNickName] = useState("");
const [Gender, setGender] = useState(false);
const [Career, setCareer] = useState("");
const [WorkPlace, setWorkPlace] = useState("");
const [PhoneNumber, setPhoneNumber] = useState("");
const [Address, setAddress] = useState("");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  
const [nameCi, setNameCi] = useState("Ho Chi Minh");
const [nameDi, setNameDi] = useState("Thu Duc");
const [nameWa, setNameWa] = useState("Linh Chieu");
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
  const [startedDate, setStartedDate] = useState("12/12/2023");
    //
  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const [token1, setToken] = useState('');

  const decodeToken = (token) => {
    try {
      const [header, payload, signature] = token.split(".");
      const decodedHeader = JSON.parse(base64UrlDecode(header));
      const decodedPayload = JSON.parse(base64UrlDecode(payload));
      return decodedPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Trả về null hoặc giá trị mặc định nếu việc giải mã không thành công
    }
  };
  
  const base64UrlDecode = (base64Url) => {
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return decode(base64); // Sử dụng hàm decode từ thư viện base-64
  };
  
  const getUserId = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
      if (token !== null) {
        console.log(token)
        const decodedToken = decodeToken(token); // Giải mã token
        if (decodedToken) {
          const UserId = decodedToken.id; // Lấy UserId từ payload của token
          console.log('UserId:', UserId);
          return UserId; // Trả về UserId
        } else {
          console.log('Error decoding token: Token is invalid');
          return null; // Trả về null nếu token không hợp lệ
        }
      } else {
        console.log('No token found in storage');
        return null; // Trả về null nếu không tìm thấy token trong AsyncStorage
      }
    } catch (error) {
      console.log('Error retrieving token:', error);
      return null; // Trả về null nếu có lỗi khi lấy token từ AsyncStorage
    }
  };
  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handlePost = async () => {
    setAuthToken(to);
    try {
      const formData = new FormData();
      formData.append("UserId", UserId);
      formData.append("FullName", FullName);
      formData.append("WorkPlace", WorkPlace);
      formData.append("Gender", Gender);
      formData.append("PhoneNumber", PhoneNumber);
      formData.append("Direction", Address);
      formData.append("DateOfBirth", today);
      formData.append("Wards", nameWa);
      formData.append("Districts", nameDi);
      formData.append("Provinces", nameCi);
      formData.append("Career", Career);
      formData.append("Nickname", NickName);
      if (selectedImage) {
        const localUri = selectedImage;
        const filename = localUri.split('/').pop();

        // Thêm thông tin hình ảnh vào formData
        formData.append('File', {
          uri: localUri,
          name: filename,
          type: 'image/jpeg', // Đổi loại hình ảnh tùy thuộc vào định dạng của file
        });
      }

      const res = await api.post("https://www.socialnetwork.somee.com/api/infor/create", formData,   {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(res.status == 200) {
        navigation.navigate('Dashboard')
      }
      console.log("het qua: ", res)
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 35,
              width: "90%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: COLORS.primary,
                textHeaderColor: "#469ab6",
                textDefaultColor: COLORS.white,
                selectedTextColor: COLORS.white,
                mainColor: "#469ab6",
                textSecondaryColor: COLORS.white,
                borderColor: "rgba(122,146,165,0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity> */}

        <Text style={{ ...FONTS.h3 }} >Add Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.primary,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Name</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={FullName}
                onChangeText={(value) => setFullName(value)}
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Nick name</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={NickName}
                onChangeText={(value) => setNickName(value)}
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Password</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={Address}
                onChangeText={(value) => setAddress(value)}
                editable={true}
                secureTextEntry
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Date or Birth</Text>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <Text>{selectedStartDate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>WorkPlace</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              value={WorkPlace}
              onChangeText={(value) => setWorkPlace(value)}
              editable={true}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={getUserId}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>

        {renderDatePicker()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateInfoScreen;
