// 이메일 유효성 검사
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
// 비밀번호 유효성 검사 (8자 이상, 숫자/문자 포함)
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
  return passwordRegex.test(password);
};

// 이름 유효성 검사 (한글, 영문, 공백 허용)
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[가-힣a-zA-Z\s]+$/;
  return nameRegex.test(name);
};

// 전화번호 유효성 검사 (01012345678 형식)
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^01[0-9]\d{3,4}\d{4}$/;
  return phoneRegex.test(phone);
};

// 필수 입력값 확인
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
  
//닉네임 유효성 검사 (한글, 영문, 언더바, 숫자 허용)
export const isValidNickname = (nickname: string): boolean => {
  const nicknameRegex = /^[a-zA-Z0-9가-힣_]+$/;
  return nicknameRegex.test(nickname);
};