/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Inicio } from './pages/Inicio';
import { Exame } from './pages/Exame';
import { Resultado } from './pages/Resultado';
import { Revisao } from './pages/Revisao';
import { Historico } from './pages/Historico';
import { Treino } from './pages/Treino';
import { Aulas } from './pages/Aulas';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="aulas" element={<Aulas />} />
          <Route path="exame" element={<Exame />} />
          <Route path="resultado/:id" element={<Resultado />} />
          <Route path="resultado" element={<Resultado />} />
          <Route path="revisao/:id" element={<Revisao />} />
          <Route path="revisao" element={<Revisao />} />
          <Route path="historico" element={<Historico />} />
          <Route path="treino" element={<Treino />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
