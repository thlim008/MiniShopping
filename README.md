# 🛍️ MiniShopping – 풀스택 쇼핑몰 프로젝트_Version 1.0

> Django REST Framework + React 기반의 풀스택 쇼핑몰 예제  
> 회원가입, 로그인(JWT), 상품 목록, 장바구니, 주문 관리 등 전자상거래 핵심 기능 포함

---

## 🧩 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | MiniShopping |
| 백엔드 | Django REST Framework |
| 프런트엔드 | React (Vite) |
| 데이터베이스 | SQLite3 |
| 인증 방식 | JWT (SimpleJWT) |
| 주요 기능 | 회원가입, 로그인/로그아웃, 상품 조회, 장바구니, 주문 관리 |

---

## 🏗️ 프로젝트 구조 (대략)

MiniShopping/
├── 📁 backend/ # Django 프로젝트
│ ├── 📁 accounts/ # 사용자 관리 앱
│ │ ├── models.py
│ │ ├── serializers.py
│ │ ├── views.py
│ │ ├── urls.py
│ │ └── migrations/
│ ├── 📁 products/ # 상품 관리 앱
│ │ ├── models.py
│ │ ├── serializers.py
│ │ ├── views.py
│ │ ├── urls.py
│ │ └── migrations/
│ ├── 📁 orders/ # 주문 관리 앱
│ │ ├── models.py
│ │ ├── serializers.py
│ │ ├── views.py
│ │ ├── urls.py
│ │ └── migrations/
│ ├── 📁 config/ # 프로젝트 설정
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── db.sqlite3
│ └── manage.py
├── 📁 frontend/ # React 프로젝트
│ ├── package.json
│ ├── vite.config.js
│ ├── 📁 public/
│ │ └── index.html
│ └── 📁 src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── 📁 api/
│ ├── 📁 pages/
│ ├── 📁 components/
│ └── 📁 styles/
├── README.md
├── requirements.txt
└── .gitignore


---

## ⚙️ 설치 및 실행

### 1️⃣ 백엔드
~~~bash
cd backend
# 가상환경 생성 및 활성화
conda create -n shopping-mall python=3.10 -y
conda activate shopping-mall
# 의존성 설치
pip install -r requirements.txt
# 데이터베이스 마이그레이션
python manage.py migrate
# 슈퍼유저 생성
python manage.py createsuperuser
# 개발 서버 실행
python manage.py runserver
~~~

### 2️⃣ 프런트엔드
~~~bash
cd frontend
# 의존성 설치
npm install
# 개발 서버 실행
npm start
~~~

브라우저에서: http://localhost:3000

---

## ⚙️ 주요 기능
- 회원가입, 로그인(JWT)
- 상품 목록 조회, 상세 페이지
- 장바구니 추가/수량 변경/삭제
- 주문 생성 및 내역 확인
- 관리자: Django Admin에서 상품/주문 관리

---

## 🧩 기술 스택
| 구분 | 기술 |
|------|------|
| 프론트엔드 | React, JavaScript, Axios |
| 백엔드 | Django, DRF, SimpleJWT |
| DB | SQLite3 |
| 개발 환경 | Python, Node.js, npm |

---

## 🤝 기여 방법
1. 저장소 Fork 후 Clone
2. 브랜치 생성: `git checkout -b feature/기능명`
3. 작업 후 Commit & Push
4. Pull Request 생성

---

## 🔮 향후 개선
- 결제 API 연동 (Stripe, PayPal)
- Docker 환경 구축
- 배포 환경 구성 (AWS, Render 등)
- 테스트 코드 추가
- 반응형/접근성 개선

---

## 📜 라이선스
MIT License

---

## 👨‍💻 개발자
- Author: [thlim008](https://github.com/thlim008)
- GitHub: [MiniShopping](https://github.com/thlim008)
