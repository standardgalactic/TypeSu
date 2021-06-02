import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout'

import Main from '../components/Main'
import Signup from '../components/Signup'
import Login from '../components/Login'

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route component={Main} />
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}

export default Router;
