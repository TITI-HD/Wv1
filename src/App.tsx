/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { MobileLayout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Support from "./pages/Support";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" defaultFontSize="medium">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
