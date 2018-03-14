import React from 'react'
import {Actions, Scene, Router, Stack} from 'react-native-router-flux'
import {Register} from "../components/register";
import Initial from "../components/initial";


export const root_scene = Actions.create(
    <Scene key="root">
        <Scene key={'initial'} title={'Taxofon'} component={Initial} initial={true}/>
        <Scene key={"register"} component={Register} title={'Регистрация'}/>
    </Scene>
);