import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom"
import ScoreBoardView from "./ScoreboardView"
import "./index.css"
import ScoreDetailView from "./ScoreDetailView"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={import.meta.env.BASE_URL}
      element={<Outlet />}
    >
      <Route
        index
        element={<ScoreBoardView />}
      />
      <Route
        path="details"
        element={<ScoreDetailView />}
      />
    </Route> 
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
