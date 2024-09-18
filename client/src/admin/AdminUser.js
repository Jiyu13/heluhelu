import styled from "styled-components";
import {PageContainer } from "../styles/Container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../api/ApiFetch";


import { PageNotFound } from "../components/PageNotFound";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { AdminUserBookList } from "./AdminUserBookList";

export function AdminUser(){

    const {user} = useContext(UserContext)

    const {id} = useParams()

    const [userAdmin, setUserAdmin] = useState(null)
    const [userAdminArticles, setUserAdminArticles] = useState(null)

    useEffect(() => {
        apiFetch(`/admin/user/${id}`)
        .then(res => res.json())
        .then(data => {
            setUserAdmin(data.user)
            setUserAdminArticles(data.articles)
        })

    }, [id])
    

    return (
        <AdminUserPageContainer>
            {
                user?.id === 33 || user?.id === 1 ?  
                <AdminUserBookList 
                    userAdmin={userAdmin}
                    userAdminArticles={userAdminArticles}
                /> 
                : 
                <PageNotFound />
            }
           
        </AdminUserPageContainer>
    )
}

const AdminUserPageContainer = styled(PageContainer)`
    box-sizing: border-box;
    display:flex;
    justify-content: center;
` 
