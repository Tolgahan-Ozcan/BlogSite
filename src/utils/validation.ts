// Email validation with regex
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation - at least 8 chars, 1 uppercase, 1 lowercase, 1 number
export const isValidPassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

// Name validation - at least 2 characters, letters, spaces, hyphens
export const isValidName = (name: string): boolean => {
  return name.length >= 2 && /^[a-zA-Z\s-]+$/.test(name);
};

// Comment/post body validation - at least 2 characters
export const isValidText = (text: string): boolean => {
  return text.trim().length >= 2;
};

// Post title validation - at least 5 characters
export const isValidTitle = (title: string): boolean => {
  return title.trim().length >= 5;
};

// Sanitize text input to prevent XSS
export const sanitizeText = (text: string): string => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Get form validation error message
export const getValidationError = (field: string, value: string): string => {
  switch (field) {
    case 'email':
      if (!value) return 'Email is required';
      if (!isValidEmail(value)) return 'Please enter a valid email address';
      return '';
      
    case 'password':
      if (!value) return 'Password is required';
      if (!isValidPassword(value))
        return 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
      return '';
      
    case 'name':
      if (!value) return 'Name is required';
      if (!isValidName(value))
        return 'Name must be at least 2 characters (letters, spaces, and hyphens only)';
      return '';
      
    case 'title':
      if (!value) return 'Title is required';
      if (!isValidTitle(value)) return 'Title must be at least 5 characters';
      return '';
      
    case 'content':
      if (!value) return 'Content is required';
      if (!isValidText(value)) return 'Content must be at least 2 characters';
      return '';
      
    case 'comment':
      if (!value) return 'Comment is required';
      if (!isValidText(value)) return 'Comment must be at least 2 characters';
      return '';
      
    default:
      return '';
  }
};