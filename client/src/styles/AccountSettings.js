import styled from "styled-components";
import { SubmitButtons } from "./Buttons";

export const AccountSettingErrorContainer = styled.div`
    color: red;
    font-size: 16px;
    margin-top: -5px;
    margin-bottom: 16px;
`

export const ProfileSubmitButtons = styled(SubmitButtons)`
    box-sizing: border-box;
    margin-top: 8px;
    padding: 8px 0;
    width: 100%;
    height: 50px;
    font-size: 1rem;
    border-radius: 4px;
    margin-right: 0px;

    &:hover {
        cursor: pointer;
    }
`

export const SettingInput = styled.input`
    border-radius: 4px;
    border: 0.5px solid hsl(212.3076923077deg, 8.4967320261%, 70%);
    padding: 8px;
    margin-bottom: 12px;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
`

export const AccountSettingLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 6px;
    margin-bottom: 6px;
`
export const AccountSettingItem = styled.div``

export const ProfileWrapper = styled.form`
    margin-top: 20px;
    
`

export const ProfileContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
`