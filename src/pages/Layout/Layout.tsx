import { FunctionComponent, ReactElement } from 'react';

import { PageMenu } from '../../components';
import { LayoutProps } from './Layout.types';

const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <PageMenu />
            <div className='container'>
                {children}
            </div>
        </>
    )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function WithLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        )
    }
}
