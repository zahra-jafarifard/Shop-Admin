import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));


const Users = lazy(() => import("../pages/users/users"));
const NewUser = lazy(() => import("../pages/users/newUser"));
const EditUser = lazy(() => import("../pages/users/editUser"));

const Products = lazy(() => import("../pages/products/products"));
const NewProducts = lazy(() => import("../pages/products/newProduct"));
const EditProducts = lazy(() => import("../pages/products/editProduct"));

const Categories = lazy(() => import("../pages/category/categories"));
const NewCategory = lazy(() => import("../pages/category/newCaregory"));
const EditCategory = lazy(() => import("../pages/category/editCategory"));

const Rolls = lazy(() => import("../pages/roll/rolls"));
const NewRoll = lazy(() => import("../pages/roll/newRoll"));
const EditRoll = lazy(() => import("../pages/roll/editRoll"));

const Profile = lazy(() => import("../pages/profile/profile"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      
      
      { path: "/users", exact: true, element: <Users /> },
      { path: "/new-user", exact: true, element: <NewUser /> },
      { path: "/edit-user", exact: true, element: <EditUser /> },

      { path: "/new-product", exact: true, element: <NewProducts /> },
      { path: "/products", exact: true, element: <Products /> },
      { path: "/edit-product", exact: true, element: <EditProducts /> },

      { path: "/categories", exact: true, element: <Categories /> },
      { path: "/new-category", exact: true, element: <NewCategory /> },
      { path: "/edit-category", exact: true, element: <EditCategory /> },
      
      { path: "/rolls", exact: true, element: <Rolls /> },
      { path: "/new-roll", exact: true, element: <NewRoll /> },
      { path: "/edit-roll", exact: true, element: <EditRoll /> },

      { path: "/profile", exact: true, element: <Profile /> },
    ],
  },
];

export default ThemeRoutes;
