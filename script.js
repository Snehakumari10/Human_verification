
document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('verificationForm');
            
            // Get all input fields
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const humanCheck = document.getElementById('humanCheck');
            
            // Get all error messages
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const humanCheckError = document.getElementById('humanCheckError');
            const successMessage = document.getElementById('successMessage');
            
            // Password strength indicator
            const passwordStrength = document.getElementById('passwordStrength');
            const strengthLabel = document.getElementById('strengthLabel');
            const progressBar = passwordStrength.querySelector('.progress-bar');
            
            // Password toggle functionality
            const passwordToggle = document.getElementById('passwordToggle');
            const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
            
            passwordToggle.addEventListener('click', function() {
                if (password.type === 'password') {
                    password.type = 'text';
                    passwordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    password.type = 'password';
                    passwordToggle.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
            
            confirmPasswordToggle.addEventListener('click', function() {
                if (confirmPassword.type === 'password') {
                    confirmPassword.type = 'text';
                    confirmPasswordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    confirmPassword.type = 'password';
                    confirmPasswordToggle.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
            
            // Validate name on input
            fullName.addEventListener('input', function() {
                validateName();
            });
            
            // Validate email on input
            email.addEventListener('input', function() {
                validateEmail();
            });
            
            // Validate phone on input
            phone.addEventListener('input', function() {
                validatePhone();
            });
            
            // Validate password on input
            password.addEventListener('input', function() {
                validatePassword();
            });
            
            // Validate confirm password on input
            confirmPassword.addEventListener('input', function() {
                validateConfirmPassword();
            });
            
            // Validate human check on input
            humanCheck.addEventListener('input', function() {
                validateHumanCheck();
            });
            
            function validateName() {
                const nameVal = fullName.value;
                const isValid = nameVal.length >= 5;
                
                toggleValidationUI(fullName, isValid, nameError);
                return isValid;
            }
            
            function validateEmail() {
                const emailVal = email.value;
                const isValid = emailVal.includes('@');
                
                toggleValidationUI(email, isValid, emailError);
                return isValid;
            }
            
            function validatePhone() {
                const phoneVal = phone.value;
                const isValid = /^\d{10}$/.test(phoneVal) && phoneVal !== '123456789';
                
                toggleValidationUI(phone, isValid, phoneError);
                return isValid;
            }
            
            function validatePassword() {
                const passwordVal = password.value;
                const fullNameVal = fullName.value;
                
                // Check password strength
                let strength = 0;
                if (passwordVal.length >= 8) strength += 25;
                if (/[A-Z]/.test(passwordVal)) strength += 25;
                if (/[0-9]/.test(passwordVal)) strength += 25;
                if (/[^A-Za-z0-9]/.test(passwordVal)) strength += 25;
                
                // Update progress bar
                progressBar.style.width = strength + '%';
                
                if (strength < 50) {
                    progressBar.className = 'progress-bar bg-danger';
                    strengthLabel.textContent = 'Weak';
                    strengthLabel.style.color = '#d63031';
                } else if (strength < 100) {
                    progressBar.className = 'progress-bar bg-warning';
                    strengthLabel.textContent = 'Medium';
                    strengthLabel.style.color = '#fdcb6e';
                } else {
                    progressBar.className = 'progress-bar bg-success';
                    strengthLabel.textContent = 'Strong';
                    strengthLabel.style.color = '#00b894';
                }
                
                // Show strength indicator if there's input
                if (passwordVal.length > 0) {
                    passwordStrength.style.display = 'block';
                    strengthLabel.style.display = 'block';
                } else {
                    passwordStrength.style.display = 'none';
                    strengthLabel.style.display = 'none';
                }
                
                // Validate password
                const isValid = passwordVal.length >= 8 && 
                    passwordVal.toLowerCase() !== 'password' && 
                    passwordVal.toLowerCase() !== fullNameVal.toLowerCase();
                
                toggleValidationUI(password, isValid, passwordError);
                return isValid;
            }
            
            function validateConfirmPassword() {
                const confirmPasswordVal = confirmPassword.value;
                const passwordVal = password.value;
                const isValid = confirmPasswordVal === passwordVal && passwordVal.length >= 8;
                
                toggleValidationUI(confirmPassword, isValid, confirmPasswordError);
                return isValid;
            }
            
            function validateHumanCheck() {
                const humanCheckVal = humanCheck.value;
                const isValid = humanCheckVal === '12';
                
                toggleValidationUI(humanCheck, isValid, humanCheckError);
                return isValid;
            }
            
            function toggleValidationUI(field, isValid, errorElement) {
                const validIcon = field.parentNode.querySelector('.valid-icon');
                const invalidIcon = field.parentNode.querySelector('.invalid-icon');
                
                if (isValid) {
                    field.classList.add('is-valid');
                    field.classList.remove('is-invalid');
                    validIcon.style.display = 'block';
                    invalidIcon.style.display = 'none';
                    errorElement.style.display = 'none';
                } else if (field.value.length > 0) {
                    field.classList.add('is-invalid');
                    field.classList.remove('is-valid');
                    validIcon.style.display = 'none';
                    invalidIcon.style.display = 'block';
                    errorElement.style.display = 'flex';
                } else {
                    field.classList.remove('is-valid', 'is-invalid');
                    validIcon.style.display = 'none';
                    invalidIcon.style.display = 'none';
                    errorElement.style.display = 'none';
                }
            }
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let isFormValid = true;
                
                if (!validateName()) isFormValid = false;
                if (!validateEmail()) isFormValid = false;
                if (!validatePhone()) isFormValid = false;
                if (!validatePassword()) isFormValid = false;
                if (!validateConfirmPassword()) isFormValid = false;
                if (!validateHumanCheck()) isFormValid = false;
                
                // If form is valid, show success message
                if (isFormValid) {
                    successMessage.style.display = 'block';
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                    
                    // Reset form after 3 seconds
                    setTimeout(function() {
                        form.reset();
                        successMessage.style.display = 'none';
                        
                        // Remove validation classes
                        const inputs = form.querySelectorAll('.form-control');
                        inputs.forEach(input => {
                            input.classList.remove('is-valid');
                        });
                        
                        // Hide password strength indicator
                        passwordStrength.style.display = 'none';
                        strengthLabel.style.display = 'none';
                    }, 3000);
                }
            });
        });