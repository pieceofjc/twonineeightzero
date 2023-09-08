import React, { useEffect, useRef } from 'react';
import { Text, Button, Alert, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import axiosInstance from '../../apis/service/client';

const SignUps: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      ID: '',
      Password: '',
      Confirm: ''
    }
  });

  /**비밀번호와 비밀번호 확인란이 같은지 확인 */
  const password = useRef({});
  password.current = watch("Password", "");

  const onSubmit = async (data : any) => {
    await axiosInstance
      .post(
        '/user/register',
        {
            user_name: data.ID,
            user_password: data.Password
        }
      )
      .then(function (res: any) {
        if (res.status === 201) {
          console.log(res.data.message);
        }
      })
      .catch(function (error: any) {
        Alert.alert('Error', error.response.data.error);
      });
  }


  return (
    <ContentContainer>
        <LeftText>아이디</LeftText>
      <Controller
        control={control}
        rules={{
            minLength: {
                value: 6,
                message: "아이디 6글자 이상 입력하시오"
            },
            maxLength: {
                value: 15,
                message: "아이디를 15글자 이하 입력하시오"
            },
            required: {
                value: true,
                message: "아이디를 입력하시오"
            }

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            placeholder="아이디를 입력하시오"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="ID"
      />
      {errors.ID && <Text style={{color: 'red'}}>{errors.ID.message}</Text>}

        <LeftText>비밀번호</LeftText>
      <Controller
        control={control}
        rules={{
            minLength: {
                value: 8,
                message: "비밀번호를 8글자 이상 입력하시오"
            },
            maxLength: {
                value: 20,
                message: "비밀번호를 20글자 이하 입력하시오"
            },
            required: {
                value: true,
                message: "비밀번호를 입력하시오"
            }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            secureTextEntry={true}
            placeholder="비밀번호를 입력하시오"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}         
          />
        )}
        name="Password"
      />
      {errors.Password && <Text style={{color: 'red'}}>{errors.Password.message}</Text>}
        
      <LeftText>비밀번호 확인</LeftText>
      <Controller
        control={control}
        rules={{
            validate: (value) => value === password.current || "비밀번호가 일치하지 않습니다",
            required: {
                value: true,
                message: "비밀번호를 입력하시오"
            }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            secureTextEntry={true}
            placeholder="비밀번호 확인"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="Confirm"
      />
      {errors.Confirm && <Text style={{color: 'red'}}>{errors.Confirm.message}</Text>}

      <View style={{margin:20}}>
        <Button color={'#00ffd1'} title="회원가입" onPress={handleSubmit(onSubmit)}/>
      </View>
    </ContentContainer>
  );
}

const ContentContainer = styled.View`
    width: 70%;
    margin: 0 auto;
    margin-top: -30px;
    justify-content: center;
    flex: 1;
`;

const LeftText = styled.Text`
    text-align: left;
    margin-top: 20px;
    color: black;
    font-size: 14px;
    font-weight: 200;
`;

const FormInput = styled.TextInput`
    border-radius: 4px;
    border: 1px solid black;
    padding: 10px 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
`;

export default SignUps;