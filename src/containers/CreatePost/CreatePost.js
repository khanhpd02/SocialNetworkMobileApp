import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Modal,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import * as ImagePicker from "expo-image-picker";
  import { COLORS, FONTS } from "../../constants";
  import { MaterialIcons } from "@expo/vector-icons";
  import { imagesDataURL } from "../../constants/data";
  import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
  import { useRecoilState, useRecoilValue } from "recoil";
import {   tokenState,likeR
} from "../../recoil/initState";
import { setAuthToken, api} from "../../utils/helpers/setAuthToken"
  const CreatePostforScreen = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
    const [content, setContent] = useState("");
    const [isChecked, setIsChecked] = useState("1");
    const [to, setToken] = useRecoilState(tokenState);
    const today = new Date();
    const handlePost = async () => {
        setAuthToken(to);
        try {
          const formData = new FormData();
          formData.append("Content", content);
          formData.append("LevelVieW", isChecked);
    
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
    
          const res = await api.post("https://www.socialnetwork.somee.com/api/post", formData,   {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          
          if(res.status == 200) {
            setSelectedImage(imagesDataURL[0])
            setContent("")
          }
          console.log("het qua: ", res)
        } catch (error) {
          console.error("Add sai!", error);
        }
      };

  
    
  
    const handleImageSelection = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
     
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    };
  
    const [selectedMode, setSelectedMode] = useState(null);

    const handleModeSelect = (mode,number) => {
        setIsChecked(number)
      setSelectedMode(mode);
      // Thực hiện hành động tương ứng với việc chọn chế độ
    };
  
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
          <TouchableOpacity
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
          </TouchableOpacity>
  
          <Text style={{ ...FONTS.h3 }}>Create Post</Text>
        </View>
            
        <View>
        <ScrollView>
        
            
      
       
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
              marginTop:20
            }}
          >
            <Text style={{ ...FONTS.h5 }}>Content</Text>
            <View
              style={{
                
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
                  placeholder="Hãy nhập suy nghĩ của bạn"
                value={content}
                onChangeText={(value) => setContent(value)}
                editable={true}
                multiline={true} // Cho phép nhập văn bản trên nhiều dòng
                numberOfLines={2}
                style={{
               paddingLeft:10,
               paddingRight:10
                }}
              />
            </View>
          </View>
        <View
        style={{
          alignItems: "left",
          marginVertical: 22,
        }}
      >  
       <Text style={{ ...FONTS.h5, marginBottom:10 }}>Image or Video</Text>
        <TouchableOpacity onPress={handleImageSelection} style={{  borderColor: COLORS.secondaryGray,
          borderWidth: 1,
          borderRadius: 4,
          paddingTop:10,
          paddingBottom:10,
          width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <View>
          <Image
            source={{ uri: selectedImage }}
            style={{
              height: 170,
              width: 170,
        
              borderWidth: 2,
              // borderColor: COLORS.primary,
            }}
          />
          
         
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom:30 }}>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginHorizontal: 5,
          backgroundColor: selectedMode === 'mode1' ? '#007bff' : '#ccc',
          borderRadius: 5,
          width:150,
          
        }}
        onPress={() => handleModeSelect('mode1','1')}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff',  textAlign: 'center' }}>Công khai</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginHorizontal: 5,
          backgroundColor: selectedMode === 'mode2' ? '#007bff' : '#ccc',
          borderRadius: 5,  width:150,
        }}
        onPress={() => handleModeSelect('mode2','2')}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff',  textAlign: 'center'}}>Bạn bè</Text>
      </TouchableOpacity>
    </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handlePost}
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

      
      </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
  export default CreatePostforScreen;
  