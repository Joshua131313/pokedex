import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route, Routes, useNavigate } from "react-router-dom";
import Logo from "./app/components/Logo/Logo";
import { links } from "./app/data/Arrays";
import Body from "./app/pages/Body/Body";
import Homepage from "./app/pages/Body/Content/Pages/Home";
import News from "./app/pages/Body/Content/Pages/News";
import Pokedex from "./app/pages/Body/Content/Pages/Pokedex";
import Pokemonpage from "./app/pages/Body/Content/Pages/Pokemonpage";
import Teambuilder from "./app/pages/Body/Content/Pages/Teambuilder";
import Videogames from "./app/pages/Body/Content/Pages/Videogames";
import LandingPage from "./app/pages/LandingPage/LandingPage";
import Login from "./app/pages/Login/Login";
import { StoreContext } from "./ContextAPI";


export const AppContainer = (props) => {
  const {firebaseLoaded, user, setUser, curUser} = useContext(StoreContext)
  const location = useLocation()
  const [id, setId] = useState(location.pathname.split('&')[1])

  const components = {
    Pokedex: Pokedex,
    Home: Homepage,
    News: News,
    Teambuilder: Teambuilder,
    Videogames: Videogames
  }

  const routesrow = links.map(route=> {
    let Component = components[route.component]
    return (
      <Route exact path={'/'+route.link} element={<Component />} />
    )
  })
  useEffect(()=> {
    setId(location.pathname.split('&')[1])
  }, [location])
  return (
    <>
      {firebaseLoaded ? (
        
          // user ? 
          //  <Home />
          //  :
          //  <AuthSwitch />
        <>

        <Routes>  
           {user ? 
        //   <Route path='/'  element={<Home />}>
        //     {/* {routesRender} */}
        //      <Route index path='/' element={<Feed />}/>
        //      <Route path='media' element={<Media />}>
        //        <Route  index element={<AlbumsRender />} />
        //        <Route  path="create-album" element={<AddAlbum />} />
        //        <Route path=':albumName/:albumId' element={<AlbumPage />} />
        //      </Route>
        //      <Route path='chats' element={<Chat />}>
        //         <Route index element={<EmptyBox />} />
        //         <Route path='new-chat' element={<NewChat />} />
        //         <Route path=':userid' element={<ChatBox />} />
        //      </Route> 
        //      <Route path='/reels'>

        //      </Route>
        //      <Route path='/market'>

        //      </Route>
        //      <Route path='/events'>

        //      </Route>
        //      <Route path='apps/*' element={<AppsRoutes /> } />
        //       <Route path='friends/*' element={<FriendsRoutes />}/>
        //       {/* <Route path=':category' element={<CategoryPage />}/>
        //       <Route path="saved" element={<>Saved</>} /> */}
        //    </Route>
          <Route  path='/' element={<Body />}>
             {routesrow}
             <Route path={`/pokedex/pokemon&${id}`} element={<Pokemonpage />} />
          </Route>
           :
            <>
            <Route exact index element={<LandingPage />} />
            <Route path='/login'  element={<Login user={user} setUser={setUser} />} />
            </>
            }
        </Routes>
        </>
      ) : (
        <div className="loadingscreen">
          <Logo />
          <div className="loadingdiv">
            <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif" />
          </div>
        </div>
      )}
    </>
  );
};
