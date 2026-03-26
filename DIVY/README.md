# NYU_SWE Group 5 - Fractional Ownership Marketplace

## Description

The Fractional Ownership Marketplace enables groups of individuals to jointly invest in
expensive assets they otherwise could not afford alone. Sellers list assets (e.g., a $100K
property), and buyers can pool money to collectively purchase them. Each buyer
becomes a fractional owner, with shares proportional to their contribution. The platform
manages group formation, secure payments through escrow, contract generation, and
distribution of profits from rent or resale. Additionally, a built-in secondary marketplace
provides liquidity, allowing users to resell their shares to others.

## Get Started

1. If you have installed Python already, run the following commands from the root project directory to install all required packages and to verify that Django was installed correctly.

```powershell
$ python -m pip install -r requirements.txt

$ python -m django --version
```

2. Once Django is installed, start the development server using these commands.

```powershell
$ cd marketproj

$ python manage.py migrate

$ python manage.py runserver
```

3. The Django development server will start running at [https://divy-dd00.onrender.com].

4. If you have installed Node.js, run the following commands from the root project directory to install all required packages for the frontend React.js server.

```powershell
$ cd frontend

$ npm install
```

5. Once JavaScript package installation is complete, start the frontend server using this command

```powershell
$ npm run start
```

6. The React development server will start running at [http://localhost:3000](http://localhost:3000).

## For Developers

Coding standards are enforced for both frontend JavaScript (ESLint + Prettier) and backend Python code (flake8 + black).

1. To format all frontend files, run the following code from the root directory

```powershell
$ cd frontend

$ npx prettier --write .

$ npx eslint . --fix
```

2. To format all backend files, run the following code from the root directory

```powershell
$ cd marketproj

$ black .
```

Eventually, formatting will be automatic upon commit and/or push.

### Members

- Likhith Vardhan Goruputi
- Vincent Hepola
- Srikar Konakanchi
- Elle Robertson
- Gaurav Rane
