# NO!GADA 🤖

**반복적인 문서 작업을 자동화해주는 문서 템플릿 도구**

> _수 십~수 백개의 맞춤형 공지사항 만들기 귀찮지 않나요?_

NO!GADA에 템플릿 파일과 데이터 파일을 업로드하면,  
맞춤형 데이터로 별로 자동으로 채워진 파일들을 한번에 만들 수 있어요!

- 템플릿 파일 지원 확장자: WORD 파일(.docx)
- 데이터 파일 지원 확장자: 엑셀 파일(.csv)

> 👉 [지금 바로 사용해보기](https://nogada.vercel.app)

---

## 🚀 프로젝트 소개

`NO!GADA`는 엑셀 데이터를 기반으로 Word 문서에 반복 입력하는  
"노가다" 작업을 대신해주는 자동화 도구입니다.  
간단한 템플릿과 데이터만 준비하면, 클릭 한 번으로 수백 개의 문서를 자동으로 만들어줍니다.

---

## 🎯 주요 기능

- ✅ 템플릿 DOCX 파일에서 `{%이름%}`, `{%전화번호%}` 같은 대체 문구 자동 추출
- ✅ CSV 파일에서 컬럼명 자동 인식 및 미리보기
- ✅ 템플릿 변수와 CSV 컬럼 수동/자동 매핑
- ✅ 모든 문서를 개별로 채워 `.docx` 파일로 생성 후 ZIP 압축 다운로드
- ✅ 모든 작업은 브라우저에서만 수행 (데이터 저장 없음)

---

## 📸 미리보기

![preview](./preview.png)

---

## 🛠 사용 방법

1. Word 템플릿 문서(.docx)에 `{%이름%}`, `{%전화번호%}` 같은 대체 문구 작성
2. CSV 파일 첫 행에 컬럼명(`이름`, `전화번호` 등)을 작성하고 데이터 입력
3. 두 파일을 업로드하면 자동으로 미리보기가 표시됨
4. 템플릿 변수와 데이터 컬럼을 매핑
5. [📦 생성하기] 버튼을 누르면 ZIP 파일로 다운로드

> 💡 **CSV 저장 시 "CSV UTF-8 (콤마로 분리)" 형식**으로 저장하면 한글 깨짐을 방지할 수 있어요!

---

## 📁 폴더 구조

```
no-gada-v2/
├── src/
│   ├── components/    # 공통 컴포넌트 (Uploader, Mapper 등)
│   ├── lib/           # 데이터 파싱, 문서 생성 로직
│   ├── pages/         # 페이지 구성
│   └── assets/        # 애니메이션, 이미지
├── public/
├── README.md
├── vite.config.ts
└── ...
```

---

## 🧰 사용 기술

- Frontend: **React 18 + Vite + TypeScript**
- UI: **Tailwind CSS**
- 문서 생성: **docxtemplater, pizzip, jszip**
- 데이터 파싱: **papaparse**
- 배포: **Vercel**

---

## 🔒 개인정보 보호

> 이 프로젝트는 **어떠한 데이터도 서버에 저장하지 않습니다.**  
> 모든 작업은 **브라우저 메모리 상에서만 수행되며**, 파일은 사용자 로컬에서만 생성됩니다.

---

## 🧪 개발 중 기능 (예정)

- [ ] 예시 파일 다운로드
- [ ] 다양한 템플릿/데이터 포맷 지원
- [ ] 멀티 언어 지원

---

## 📎 링크

- 🔗 배포 주소: [https://nogada.vercel.app](https://nogada.vercel.app)
- 🛠 GitHub: [https://github.com/yeinn/no-gada-v2](https://github.com/yeinn/no-gada-v2)

---

## 🙌 만든 사람

- 프론트엔드 개발자 **Yeinn**
- 기획/디자인/개발까지 혼자 만든 실사용 자동화 도구

> 이 프로젝트가 도움이 되셨다면 ⭐️ Star 부탁드립니다!
