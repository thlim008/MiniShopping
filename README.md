# 🛒 미니 쇼핑몰 프로젝트

DRF와 React를 활용한 풀스택 쇼핑몰 프로젝트

## 🚀 기술 스택
- Backend: Django REST Framework
- Frontend: React
- Database: SQLite (개발용)
- Python Environment: Miniconda

## 📋 주요 기능
- 상품 목록/상세 보기
- 장바구니 기능
- 주문 시스템
- 사용자 인증 (회원가입/로그인)

## 🏃‍♂️ 실행 방법
### Backend (Miniconda)
```bash
conda activate shopping-mall
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm start
```