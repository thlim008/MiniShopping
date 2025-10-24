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
MiniShopping/
│
├── backend/                           # Django 백엔드
│   ├── manage.py                      # Django CLI
│   ├── requirements.txt               # Python 의존성
│   ├── db.sqlite3                     # SQLite DB
│   │
│   ├── config/                        # 프로젝트 설정
│   │   ├── settings.py               # Django 설정
│   │   ├── urls.py                   # URL 라우팅
│   │   ├── wsgi.py                   # WSGI 엔트리포인트
│   │   └── asgi.py                   # ASGI 엔트리포인트
│   │
│   ├── products/                      # 상품 앱
│   │   ├── models.py                 # Product, Category 모델
│   │   ├── serializers.py            # DRF 시리얼라이저
│   │   ├── views.py                  # API 뷰
│   │   ├── urls.py                   # URL 패턴
│   │   ├── admin.py                  # 관리자 페이지
│   │   └── migrations/               # DB 마이그레이션
│   │
│   ├── cart/                          # 장바구니 앱
│   │   ├── models.py                 # Cart, CartItem 모델
│   │   ├── serializers.py            
│   │   ├── views.py                  # 장바구니 API
│   │   ├── urls.py                   
│   │   └── migrations/               
│   │
│   ├── orders/                        # 주문 앱
│   │   ├── models.py                 # Order, OrderItem 모델
│   │   ├── serializers.py            
│   │   ├── views.py                  # 주문 API
│   │   ├── urls.py                   
│   │   └── migrations/               
│   │
│   ├── accounts/                      # 인증 앱
│   │   ├── models.py                 # User, UserProfile 모델
│   │   ├── serializers.py            
│   │   ├── views.py                  # 인증 API
│   │   ├── urls.py                   
│   │   └── migrations/               
│   │
│   ├── media/                         # 업로드 파일
│   │   └── products/                 # 상품 이미지
│   │
│   └── static/                        # 정적 파일
│       ├── css/
│       ├── js/
│       └── images/
│
├── frontend/                          # React 프론트엔드
│   ├── package.json                   # npm 의존성
│   ├── package-lock.json              
│   │
│   ├── public/                        # 정적 리소스
│   │   ├── index.html                
│   │   ├── favicon.ico               
│   │   └── manifest.json             
│   │
│   └── src/                           # 소스 코드
│       ├── index.js                  # 엔트리포인트
│       ├── App.js                    # 루트 컴포넌트
│       ├── index.css                 
│       ├── App.css                   
│       │
│       ├── components/               # UI 컴포넌트
│       │   ├── common/              # 공통 컴포넌트
│       │   │   ├── Header.js        # 헤더
│       │   │   ├── Footer.js        # 푸터
│       │   │   ├── Navbar.js        # 네비게이션
│       │   │   ├── Button.js        
│       │   │   ├── Input.js         
│       │   │   ├── Modal.js         
│       │   │   └── Spinner.js       # 로딩
│       │   │
│       │   ├── product/             # 상품 컴포넌트
│       │   │   ├── ProductCard.js   # 상품 카드
│       │   │   ├── ProductGrid.js   # 상품 그리드
│       │   │   ├── ProductFilter.js # 필터
│       │   │   └── SearchBar.js     # 검색
│       │   │
│       │   ├── cart/                # 장바구니 컴포넌트
│       │   │   ├── CartItem.js      
│       │   │   ├── CartSummary.js   
│       │   │   └── EmptyCart.js     
│       │   │
│       │   └── order/               # 주문 컴포넌트
│       │       ├── OrderItem.js     
│       │       ├── OrderSummary.js  
│       │       └── OrderStatus.js   
│       │
│       ├── pages/                    # 페이지
│       │   ├── Home.js              # 홈
│       │   ├── ProductList.js       # 상품 목록
│       │   ├── ProductDetail.js     # 상품 상세
│       │   ├── Cart.js              # 장바구니
│       │   ├── Checkout.js          # 결제
│       │   ├── OrderHistory.js      # 주문 내역
│       │   ├── OrderDetail.js       # 주문 상세
│       │   ├── Login.js             # 로그인
│       │   ├── Register.js          # 회원가입
│       │   ├── Profile.js           # 프로필
│       │   └── NotFound.js          # 404
│       │
│       ├── services/                 # API 서비스
│       │   ├── api.js               # Axios 설정
│       │   ├── authService.js       # 인증 API
│       │   ├── productService.js    # 상품 API
│       │   ├── cartService.js       # 장바구니 API
│       │   └── orderService.js      # 주문 API
│       │
│       ├── context/                  # React Context
│       │   ├── AuthContext.js       # 인증 상태
│       │   ├── CartContext.js       # 장바구니 상태
│       │   └── ThemeContext.js      # 테마
│       │
│       ├── hooks/                    # Custom Hooks
│       │   ├── useAuth.js           
│       │   ├── useCart.js           
│       │   ├── useProducts.js       
│       │   └── useDebounce.js       
│       │
│       ├── utils/                    # 유틸리티
│       │   ├── helpers.js           # 헬퍼 함수
│       │   ├── validators.js        # 검증 함수
│       │   ├── constants.js         # 상수
│       │   └── localStorage.js      # 로컬스토리지
│       │
│       ├── styles/                   # 스타일
│       │   ├── variables.css        # CSS 변수
│       │   ├── reset.css            
│       │   ├── global.css           
│       │   └── responsive.css       
│       │
│       └── assets/                   # 에셋
│           ├── images/              
│           └── icons/               
│
├── .gitignore                        
├── README.md                         
└── LICENSE                           
```

### 🚀 설치 및 실행

**사전 요구사항**
- Python 3.8+
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
conda create -n shopping-mall python=3.9
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
MiniShopping/
├── backend/              # Django Backend
│   ├── config/          # Settings
│   ├── products/        # Product app
│   ├── cart/            # Cart app
│   ├── orders/          # Order app
│   ├── accounts/        # Auth app
│   ├── media/           # Uploads
│   └── static/          # Static files
│
└── frontend/            # React Frontend
    ├── public/          # Public assets
    └── src/
        ├── components/  # UI components
        ├── pages/       # Pages
        ├── services/    # API services
        ├── context/     # Context
        ├── hooks/       # Custom hooks
        ├── utils/       # Utils
        └── styles/      # Styles
```

### 🚀 Setup

**Prerequisites**
- Python 3.8+
- Node.js 14+
- npm
- Miniconda

**Backend**
```bash
conda create -n shopping-mall python=3.9
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