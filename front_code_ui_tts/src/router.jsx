import { Route } from 'react-router-dom'
import { createRoutesFromElements, createBrowserRouter } from 'react-router-dom'

import Home from './pages/home'
import SingIn from './pages/singin'
import Upload from './pages/upload'
import AppLayout from './AppLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='/singin' element={<SingIn />} />
        <Route path='/upload' element={<Upload />} />
      </Route>
    </>
  )
)

export default router
