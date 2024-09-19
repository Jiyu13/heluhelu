import styled from "styled-components";
import {PageContainer } from "../styles/Container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../api/ApiFetch";


import { PageNotFound } from "../components/PageNotFound";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { AdminUserBookList } from "./AdminUserInfoPage";

export function AdminUser(){

    const {user} = useContext(UserContext)

    const {id} = useParams()

    const [userAdmin, setUserAdmin] = useState(null)
    const [userAdminArticles, setUserAdminArticles] = useState(null)
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        if (user && (user?.id === 1 || user?.id === 33)) {
            apiFetch(`/admin/user/${id}`)
            .then(res => res.json())
            .then(data => {
                setUserAdmin(data.user)
                setUserAdminArticles(data.articles)
                setFormData({ 
                    username: data.user.username,
                    email: data.user.email,
                    password: ""
                })
            })
        }
    }, [id, user?.id])
    

    return (
        <AdminUserPageContainer>
            {
                user?.id === 33 || user?.id === 1 ?  
                <AdminUserBookList 
                    userAdmin={userAdmin}
                    userAdminArticles={userAdminArticles}
                    formData={formData}
                    setFormData={setFormData}
                /> 
                : 
                <PageNotFound />
            }
           
        </AdminUserPageContainer>
    )
}

const AdminUserPageContainer = styled(PageContainer)`
    box-sizing: border-box;
    justify-content: center;
` 
