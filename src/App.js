import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client'
import Header from '../components/Header'
import Body from '../components/Body'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
//import About from '../components/About';
import Contact from '../components/Contact';
import Error from '../components/Error';
import RestaurantMenu from '../components/RestaurantMenu'
import Shimmer from '../components/Shimmer';
import { Provider } from 'react-redux';
import appStore from '../utils/appStore';
import Cart from '../components/Cart';

// Chunking, code splitting, lazy loading, dynamic bundling
// lazy loading first throws an error bcz react runs fast even before the about page was got from network
// thus we use suspense
const About = lazy(() => import("../components/About"))
const AppLayout = () => {
    return(
        <Provider store={appStore}>
            <div className="app">
                <Header />
                <Outlet />
            </div>
        </Provider>
    )
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <Suspense fallback={<Shimmer></Shimmer>}><About /></Suspense>
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            }
        ],
        errorElement: <Error />
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
