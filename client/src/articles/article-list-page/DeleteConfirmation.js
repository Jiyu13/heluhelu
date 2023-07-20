import styled from "styled-components"
import apiFetch from "../../api/ApiFetch"

export function DeleteConfirmation({ setDeletePopup, articleID, onDeleteArticle }) {

    function handleNo() {
        setDeletePopup(false)
    }

    function handleDelete(){
        apiFetch(`/article/${articleID}`, {
            method: "DELETE",
        })
        .then(() => {
            onDeleteArticle(articleID)})
    } 

    return (
        <ModalContainer>

            <ModalDialog>
                <ModalContent>
                    <ModalHeader>
                        <HeaderText>Delete?</HeaderText>
                    </ModalHeader>
                    <ModalBody>
                        <BodyText>Are you sure you want to delete this article?</BodyText>
                    </ModalBody>
                    <ModalFooter>
                        <NoButton href="#" onClick={handleNo}>No</NoButton>
                        <YesButton href="/" onClick={handleDelete}>Yes</YesButton>
                    </ModalFooter>
                </ModalContent>
            </ModalDialog>
        </ModalContainer>
    )
}

const buttons = styled.a`
    background-color: #fff;
    font-size: 1em;  // 16px
    font-weight: bold;
    padding: 0.7em 1em;
    transition: .2s;
    background-color: #fff;
    border-radius: 6.2px;
    display: inline-block;
    text-decoration: none;
    margin-right: 20px;
    cursor: pointer;
    color: #6d6e70;
    background-position: center center;

    &:visited {
        color: #6d6e70;
    }

    &:hover {
        transform: scale(1.02);
        background-position: 0 -15px;
        transition: background-position .1s linear;
    }
`

const YesButton = styled(buttons)`
    background-color: #ffc000;
    border: none;
    margin-right: 0px;

    &:hover {
        background-color: #f5b800;
        color: #2c3445;
    }

`

const NoButton = styled(buttons)`
    &:hover {
        background-color: #6d6e70;
        color: #2c3445;
    }
`


const ModalFooter = styled.div`
    border-radius: 0 0 6px 6px;
    padding: 14px 15px 15px;
    margin-bottom: 0;
    text-align: right;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
`
const BodyText = styled.p`
    margin: 0 0 10px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    font-size: 1em;
`

const ModalBody = styled.div`
    position: relative;
    padding: 15px;
`

const HeaderText = styled.h3`
    text-align: center;
    font-size: 17px;
    line-height: 1.5em;
    margin: 10px 0;
    color: #6d6e70;
`

const ModalHeader = styled.div`
    padding: 5px 15px;
    border-bottom: 1px solid #e5e5e5;
`
const ModalContent = styled.div`
    position: relative;
    margin: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 6px;
    outline: 0;
`
const ModalDialog = styled.div`
    position: relative;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%); // ????
    background-color: white;
    border-radius: 10px;
    max-width: 600px;
    z-index: 1001;
    // font-size: 20px;
    line-weight: 1.6;
`

const ModalContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(83,92, 104, 0.8);
    z-index: 1000;
    opacity: 1;
`