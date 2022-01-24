import { Loader } from "@mantine/core";
import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { Login } from "./containers/Login";
import { Register } from "./containers/Register";
import { Dashboard } from "./containers/User";
import { GroupDetails } from "./containers/User/GroupDetails";
import { Groups } from "./containers/User/Groups";
import { FinishedTrips } from "./containers/User/FinishedTrips";
import { NewGroup } from "./containers/User/NewGroup";
import { UserPackages } from "./containers/User/Packages";
import { retrieveUser } from "./redux/user.reducer";
import { BuyPackage } from "./containers/User/BuyPackage";
function App() {
  const dispatch = useDispatch()
  const $user = useSelector((state: RootStateOrAny) => state.$user)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(retrieveUser())
  }, []);
  useEffect(() => {
    if ($user.loggedIn) navigate('/dashboard', { replace: true })
    if (!$user.loggedIn) navigate('/', { replace: true })

  }, [$user.loggedIn]);

  if ($user.loading) return <div className="w-full h-screen flex flex-col items-center justify-center">
    <Loader size={'lg'} />
  </div>
  return (

    <div style={{ width: '100%', height: "100%" }}>
      <Routes>
        <Route path='/'>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='/dashboard' element={<Dashboard />} >
            <Route index element={<Groups />} />
            <Route path="group/:id" element={<GroupDetails />} />
            <Route path="create/group" element={<NewGroup />} />
            <Route path="packages"  >
              <Route index element={<UserPackages />} />
              <Route path='buy/:id' element={<BuyPackage />} />

            </Route>
            <Route path="finished" element={<FinishedTrips />} />
          </Route>
        </Route>
      </Routes>
    </div>

  );
}

export default App;
