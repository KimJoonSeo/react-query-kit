import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import React from "react";
import {QueryClient, QueryClientConfig, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {RQSuperHeroPage} from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import {DynamicParallelPage} from "./components/DynamicParallel.page";
import {DependentQueriesPage} from "./components/DependentQueries.page";

const options: QueryClientConfig = {
  defaultOptions: {
    queries: {
      networkMode: 'always',
    }
  }
}
const queryClient = new QueryClient(options);
function App() {

  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/super-heroes'>Traditional Super Heroes</Link>
                </li>
                <li>
                  <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path='/super-heroes' element={<SuperHeroesPage />} />
              <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
              <Route path='/' element={<HomePage />} />
              <Route path={'/rq-super-heroes/:heroId'} element={<RQSuperHeroPage />} />
              <Route path={'/rq-parallel'} element={<ParallelQueriesPage />} />
              <Route path={'/rq-dynamic-parallel'} element={<DynamicParallelPage heroIds={['1', '2']} />} />
              <Route path={'/rq-dependent'} element={<DependentQueriesPage email={'vishwas@example.com'}/>}/>
            </Routes>
          </div>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
  )
}

export default App