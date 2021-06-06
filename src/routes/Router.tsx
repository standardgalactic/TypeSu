import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout'

import Main from '../components/Main'

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route component={Main} />
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}

export default Router;
