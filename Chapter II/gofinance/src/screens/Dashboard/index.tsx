import React from 'react'

import * as S from './styles';

export default function Dashboard() {
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.UserPhoto source={{ uri: 'https://avatars.githubusercontent.com/u/54987514?v=4.png'}} />

            <S.User>
              <S.UserGreetings>Ola</S.UserGreetings>
              <S.UserName>Saron</S.UserName>
            </S.User>
          </S.UserInfo>
        </S.UserWrapper>
      </S.Header>
    </S.Container>
  )
}
