# MiniShopping 🛒

[한국어](#한국어) | [English](#english)

---

## 한국어

DRF(Django REST Framework)와 React를 활용한 풀스택 쇼핑몰 프로젝트

### 📋 목차
- [프로젝트 소개](#-프로젝트-소개)
- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [프로젝트 구조](#-프로젝트-구조)
- [설치 및 실행](#-설치-및-실행)
- [API 문서](#-api-문서)

### 🎯 프로젝트 소개

MiniShopping은 Django REST Framework를 백엔드로, React를 프론트엔드로 사용하는 풀스택 전자상거래 웹 애플리케이션입니다.

### 🛠 기술 스택

**Backend**
- Django REST Framework - RESTful API
- Python 3.x
- SQLite (개발용)
- Django ORM

**Frontend**
- React - UI 구축
- JavaScript/JSX
- CSS/SCSS
- Axios - HTTP 통신

**DevTools**
- Miniconda - Python 환경 관리
- npm - 패키지 관리
- Git - 버전 관리

### ✨ 주요 기능

**상품 관리**
- ✅ 상품 목록/상세 조회
- ✅ 카테고리별 분류
- ✅ 상품 검색

**장바구니**
- ✅ 상품 추가/삭제
- ✅ 수량 조절
- ✅ 총액 계산

**주문**
- ✅ 주문 생성/조회
- ✅ 주문 상태 관리

**인증**
- ✅ 회원가입/로그인
- ✅ 프로필 관리
- ✅ JWT 토큰 인증

### 📁 프로젝트 구조

```
mini-shopping-mall/
│
├── backend/                           # Django 백엔드
│   ├── manage.py                      # Django CLI
│   ├── requirements.txt               # Python 의존성
│   ├── db.sqlite3                     # SQLite DB
│   │
│   ├── config/                        # 프로젝트 설정
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   ├── asgi.py                   # ASGI 설정
│   │   ├── settings.py               # Django 설정
│   │   ├── urls.py                   # URL 라우팅
│   │   └── wsgi.py                   # WSGI 설정
│   │
│   ├── accounts/                      # 사용자 인증 앱
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── orders/                        # 주문 관리 앱
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   └── products/                      # 상품 관리 앱
│       ├── __pycache__/
│       ├── migrations/
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── tests.py
│       ├── urls.py
│       └── views.py
│
├── frontend/                          # React 프론트엔드
│   ├── node_modules/                  # npm 패키지
│   ├── public/                        # 정적 리소스
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/                           # 소스 코드
│   │   ├── components/               # 컴포넌트
│   │   │   └── Layout.js
│   │   │
│   │   ├── contexts/                 # React Context
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   │
│   │   ├── pages/                    # 페이지
│   │   │   ├── CartPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── OrdersPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   └── RegisterPage.js
│   │   │
│   │   ├── services/                 # API 서비스
│   │   │   └── api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.js                    # 루트 컴포넌트
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js                  # 엔트리포인트
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   │
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── .gitignore                         # Git 제외 파일
├── LICENSE                            # 라이선스
└── README.md                          # 프로젝트 문서
```

### 🚀 설치 및 실행

**사전 요구사항**
- Python 3.12
- Node.js 14+
- npm
- Miniconda (권장)

**1. 클론**
```bash
git clone https://github.com/thlim008/MiniShopping.git
cd MiniShopping
```

**2. 백엔드 실행**
```bash
# Conda 환경 생성
conda create -n shopping-mall python=3.12
conda activate shopping-mall

# 의존성 설치
cd backend
pip install -r requirements.txt

# DB 마이그레이션
python manage.py makemigrations
python manage.py migrate

# 슈퍼유저 생성 (선택)
python manage.py createsuperuser

# 서버 실행
python manage.py runserver
```
→ `http://localhost:8000`

**3. 프론트엔드 실행**
```bash
cd frontend
npm install
npm start
```
→ `http://localhost:3000`

### 📡 API 문서

**인증**
```
POST   /api/auth/register/       # 회원가입
POST   /api/auth/login/          # 로그인
POST   /api/auth/logout/         # 로그아웃
GET    /api/auth/user/           # 사용자 정보
PUT    /api/auth/user/           # 정보 수정
```

**상품**
```
GET    /api/products/            # 목록
GET    /api/products/:id/        # 상세
GET    /api/products/search/     # 검색
GET    /api/categories/          # 카테고리
```

**장바구니**
```
GET    /api/cart/                # 조회
POST   /api/cart/add/            # 추가
PUT    /api/cart/:id/            # 수정
DELETE /api/cart/:id/            # 삭제
```

**주문**
```
GET    /api/orders/              # 목록
GET    /api/orders/:id/          # 상세
POST   /api/orders/              # 생성
PATCH  /api/orders/:id/status/   # 상태 변경
```

### 💻 환경설정

**Backend (.env)**
```python
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

CORS_ALLOWED_ORIGINS=http://localhost:3000
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_MEDIA_URL=http://localhost:8000/media
```

### 📝 주요 패키지

**Backend**
```
Django>=4.0
djangorestframework>=3.14
django-cors-headers>=3.13
djangorestframework-simplejwt>=5.2
Pillow>=9.0
```

**Frontend**
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.0.0"
  }
}
```

### 📄 라이선스

MIT License - `LICENSE` 파일 참조

### 👤 작성자

**thlim008** - [@thlim008](https://github.com/thlim008)

---

## English

Full-stack shopping mall using Django REST Framework and React

### 📋 Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack-1)
- [Features](#-features)
- [Structure](#-structure)
- [Setup](#-setup)
- [API](#-api)

### 🎯 Overview

MiniShopping is a full-stack e-commerce web application using Django REST Framework backend and React frontend.

### 🛠 Tech Stack

**Backend**
- Django REST Framework
- Python 3.x
- SQLite
- Django ORM

**Frontend**
- React
- JavaScript/JSX
- CSS/SCSS
- Axios

**Tools**
- Miniconda
- npm
- Git

### ✨ Features

**Products**
- ✅ List/Detail view
- ✅ Categories
- ✅ Search

**Cart**
- ✅ Add/Remove items
- ✅ Quantity control
- ✅ Total calculation

**Orders**
- ✅ Create/View orders
- ✅ Status management

**Auth**
- ✅ Register/Login
- ✅ Profile management
- ✅ JWT authentication

### 📁 Structure

```
mini-shopping-mall/
│
├── backend/                           # Django Backend
│   ├── manage.py                      # Django CLI
│   ├── requirements.txt               # Python dependencies
│   ├── db.sqlite3                     # SQLite database
│   │
│   ├── config/                        # Project settings
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   ├── asgi.py                   # ASGI config
│   │   ├── settings.py               # Django settings
│   │   ├── urls.py                   # URL routing
│   │   └── wsgi.py                   # WSGI config
│   │
│   ├── accounts/                      # User authentication app
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── orders/                        # Order management app
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   └── products/                      # Product management app
│       ├── __pycache__/
│       ├── migrations/
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── tests.py
│       ├── urls.py
│       └── views.py
│
├── frontend/                          # React Frontend
│   ├── node_modules/                  # npm packages
│   ├── public/                        # Public assets
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/                           # Source code
│   │   ├── components/               # Components
│   │   │   └── Layout.js
│   │   │
│   │   ├── contexts/                 # React Context
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   │
│   │   ├── pages/                    # Pages
│   │   │   ├── CartPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── OrdersPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   └── RegisterPage.js
│   │   │
│   │   ├── services/                 # API services
│   │   │   └── api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.js                    # Root component
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js                  # Entry point
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   │
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── .gitignore                         # Git ignore
├── LICENSE                            # License
└── README.md                          # Project documentation
```

### 🚀 Setup

**Prerequisites**
- Python 3.12
- Node.js 14+
- npm
- Miniconda

**Backend**
```bash
conda create -n shopping-mall python=3.12
conda activate shopping-mall
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend**
```bash
cd frontend
npm install
npm start
```

### 📡 API

**Auth**
```
POST /api/auth/register/
POST /api/auth/login/
GET  /api/auth/user/
```

**Products**
```
GET /api/products/
GET /api/products/:id/
GET /api/categories/
```

**Cart**
```
GET    /api/cart/
POST   /api/cart/add/
DELETE /api/cart/:id/
```

**Orders**
```
GET  /api/orders/
POST /api/orders/
GET  /api/orders/:id/
```

### 📄 License

MIT License

### 👤 Author

**thlim008** - [@thlim008](https://github.com/thlim008)

---

⭐️ Star this repo if you find it helpful!