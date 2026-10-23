# VADA

## Run the frontend and your backend together

The frontend calls the API at `http://localhost:5001/api`. Run the backend
from `C:\Users\Admin\Desktop\my-vada-beckend` and the frontend from this folder.

1. In a terminal, start the backend:

   ```powershell
   Set-Location 'C:\Users\Admin\Desktop\my-vada-beckend'
   npm.cmd install
   npm.cmd run dev
   ```

   The backend reads its MongoDB and JWT settings from
   `C:\Users\Admin\Desktop\my-vada-beckend\src\.env`.

2. Keep that terminal open. In a second terminal, start the frontend:

   ```powershell
   Set-Location 'C:\Users\Admin\Desktop\my-vada-project'
   npm.cmd run dev
   ```

3. Open the frontend URL printed in the terminal (usually
   `http://localhost:5173`).

The backend must be listening on port 5001 and MongoDB must be available.
Do not share or commit the backend `.env` file.

## Build

Run `npm.cmd run build` to build the frontend into `dist`.
