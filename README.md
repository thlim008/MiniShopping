🛍️ MiniShopping – 풀스택 쇼핑몰 프로젝트
📘 개요

MiniShopping은 Django REST Framework(DRF)와 React를 이용해 구현한 풀스택 쇼핑몰 웹 애플리케이션입니다.
상품 조회, 장바구니, 주문, 사용자 인증(회원가입/로그인) 등 핵심 기능을 포함하고 있으며,
웹 개발 학습용 또는 쇼핑몰 프로토타입 제작용으로 활용할 수 있습니다.

🧩 기술 스택
구분	기술
Frontend	React, JavaScript, Axios
Backend	Django, Django REST Framework
Database	SQLite (기본)
환경 관리	Miniconda
기타	Node.js, npm

⚙️ 주요 기능

🛒 상품 관리 – 상품 목록 및 상세 조회

🧺 장바구니 기능 – 상품 추가/삭제

💳 주문 처리 – 장바구니에서 주문 생성

👤 사용자 인증 – 회원가입, 로그인, JWT 기반 인증

🔗 백엔드–프론트엔드 연동

🚀 설치 및 실행 방법
1️⃣ 백엔드 설정
# 가상환경 활성화
conda activate shopping-mall

# 백엔드 폴더로 이동
cd backend

# 의존성 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션
python manage.py migrate

# 서버 실행
python manage.py runserver

2️⃣ 프런트엔드 설정
# 프런트엔드 폴더로 이동
cd frontend

# 패키지 설치
npm install

# 개발 서버 실행
npm start


브라우저에서 👉 http://localhost:3000
 접속

📁 프로젝트 구조
MiniShopping/
├── backend/          # Django REST API 서버
│   ├── api/          # 앱 및 시리얼라이저
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/         # React 클라이언트
│   ├── src/
│   ├── package.json
│   └── public/
│
└── README.md

🧠 개발 순서 요약

Django로 API 서버 구성

React로 사용자 UI 개발

CORS 설정 및 JWT 인증 연동

상품, 장바구니, 주문 API 연결

🤝 기여 방법

이 저장소를 Fork 후 Clone

새 브랜치 생성:

git checkout -b feature/기능명


기능 추가 후 Commit & Push

Pull Request 생성

🔮 향후 개선 예정

결제 API 연동 (PayPal, Stripe 등)

배포 환경 구성 (AWS, Render, Heroku 등)

Docker 환경 구축

테스트 코드 추가 (pytest, Jest)

📜 라이선스

이 프로젝트는 MIT License를 따릅니다.
자유롭게 수정 및 배포 가능합니다.

👨‍💻 개발자 정보

Author: thlim008

Email: (선택사항)

GitHub: https://github.com/thlim008/MiniShopping

감사합니다 🙏
MiniShopping 프로젝트에 방문해 주셔서 감사합니다!