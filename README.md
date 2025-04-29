# NOGADA

> 반복적인 문서 작업을 자동화하는 미니멀 도구  
> 템플릿 Word(.docx) 파일 + 데이터(.csv, .xlsx) 파일 → 개별 문서 자동 생성

---

## 프로젝트 진행 상황 (2025.04.25 기준)

- [x] Vite + React + TypeScript + TailwindCSS 프로젝트 셋업
- [x] 폴더 구조 정리, 기본 컴포넌트 개발
- [x] 템플릿 업로더/데이터 업로더(공통 컴포넌트로 리팩터링)
- [x] 데이터 파일 파싱 및 미리보기
- [-] 템플릿 변수 추출/매핑 UI
- [ ] docx 일괄 생성 및 zip 다운로드 기능

---

## 주요 기능 (예정)

- Word 템플릿(.docx) 내 `{이름}`, `{전화번호}` 등 변수 추출
- 데이터 파일(.csv, .xlsx) 업로드 후 표 미리보기
- 변수와 컬럼명 매핑 (자동/수동, 예정)
- 개별 docx 생성 후 zip 압축 다운로드
- 개인정보 저장 없음, 모든 작업은 브라우저 메모리에서 처리

---

## 폴더 구조 예시

```
nogada/
  ├── public/
  ├── src/
  │    ├── components/
  │    ├── pages/
  │    ├── lib/
  │    ├── styles/
  │    └── main.tsx
  ├── package.json
  ├── tailwind.config.js
  ├── postcss.config.js
  ├── vite.config.ts
  └── README.md
```

---

## 사용법 (진행 중)

1. 템플릿 Word(.docx)에 `{이름}` 등 변수를 입력
2. 데이터 파일(.csv, .xlsx)에 변수와 매칭되는 컬럼명 작성
3. 두 파일 업로드 → 데이터 미리보기 확인
4. (추후) zip 생성 및 다운로드

---

## 기술스택

- React, Vite, TypeScript, TailwindCSS
- xlsx, papaparse, docxtemplater, pizzip, jszip

---

## TODO

- [ ] 생성/다운로드 로직 구현
- [ ] 배포(Vercel 예정)
- [ ] README/스크린샷/샘플 파일 추가

---

> **본 프로젝트는 개발 중인 버전입니다.  
> 기능/폴더 구조/설명이 계속 업데이트될 예정입니다.**
