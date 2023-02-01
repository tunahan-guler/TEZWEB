import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { useTranslation } from 'react-i18next'
import * as yup from 'yup';
import _ from '@lodash';
import { useLoginMutation } from '../../../../generated/graphql'
import FuseSplashScreen from '../../../../@fuse/core/FuseSplashScreen/FuseSplashScreen'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('Geçerli bir email girmelisiniz').required('Email girmelisiniz.'),
  password: yup
    .string()
    .required('Lütfen şifrenizi giriniz.')
    .min(1, 'Şifre çok kısa - minimum 1 karakter olmalı.'),
});

const defaultValues = {
  email: '',
  password: '',
};

function JWTLoginTab() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);
  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [loginMutation, { loading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValue('email', '', { shouldDirty: true, shouldValidate: true });
    setValue('password', '', { shouldDirty: true, shouldValidate: true });
    // setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
    // setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
  }, [reset, setValue, trigger]);

  useEffect(() => {
    login.errors.forEach((error) => {
      setError(error.type, {
        type: 'manual',
        message: error.message,
      });
    });
  }, [login.errors, setError]);

  function onSubmit(model) {

    dispatch(submitLogin({ ...model, loginMutation }));
  }

  if (loading) {
    return <FuseSplashScreen />
  }

  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      account_circle
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              label={t('Password')}
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              InputProps={{
                className: 'pr-2',
                type: showPassword ? 'text' : 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                      <Icon className="text-20" color="action">
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          )}
        />

        <Button
          type="  "
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          {t('Login')}
        </Button>
      </form>

    </div>
  );
}

export default JWTLoginTab;
