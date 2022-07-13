import React from 'react'

// Base Page
import '../../utils/styles/base-page.css'
// Body - Topic
import { LoginFormContainer, LoginFormRowContainer, LoginFormOuterBox, LoginFormBox, LoginFormContentBox, LoginFormContentTitleBox } from '../../utils/styles/login-form'
// Footer
import { Footer } from '../../components/'
// Filler
import { FlexBoxFiller } from '../../utils/styles/flexbox-filler'
// Form
import { Formik, Field, Form } from 'formik';

// Api call to login in
import { getUserLogin } from '../../utils/api'

const login = (values, history) => {
    getUserLogin(values, history)
}

function Body({ history }) {
    return (
        <LoginFormContainer>
            <LoginFormRowContainer>
                <LoginFormOuterBox>
                    <LoginFormBox>
                        <Formik
                        initialValues={{
                        username: '',
                        password: '',
                        }}
                        onSubmit={async (values) => {
                            await login(values, history)
                        }}
                        >
                            <Form>
                                <LoginFormContentBox>
                                    <Field id="username" name="username" placeholder="Username" />
                                </LoginFormContentBox>
                                <LoginFormContentBox>
                                    <Field id="password" name="password" placeholder="Password" type="password"/>
                                </LoginFormContentBox>
                                <LoginFormContentBox>
                                    <button type="submit">Login</button>
                                </LoginFormContentBox>
                            </Form>
                        </Formik>
                    </LoginFormBox>
                </LoginFormOuterBox>
            </LoginFormRowContainer>
        </LoginFormContainer>
    )
}

function BasePage({ history }) {
    return (
        <div>
            <input type="radio" class="input" checked={false} />
            <div class="base-page-container">
                <Body history={history}/>
                <FlexBoxFiller />
                <Footer history={history} />
            </div>
        </div>
    )
}

export function LoginPage({ history }) {

     return (
         <BasePage history={history} />
    )
}

export default LoginPage
