export type Environment = {
  production?: boolean,
  oktaBstarClient?: string,
  buildid?: string,
  envid?: string,
  frontend?: {
    i18n?: {
      timezoneDefault?: string,
      localeIDDefault?: string,
      localesSupported?: Locale[]
    },
    placeholderImage?: string
  },
  backend?: {
    categories?: {
      api?: {
        grsgql?: {
          esIndex?: string
        }
      },
      storage?: {
        inspectionimages?: {
          region?: string,
          bucket?: string,
          listObjectsV2MaxKeys?: number,
          signedUrlPromiseExpiry?: number
        }
      }
    }
  }
};

export type Locale = {
  id: string,
  displayName: string
};

export type APIState = {
  loading: boolean,
  success: boolean,
  error: boolean
};

export const apiStateDefault: APIState = {
  loading: false,
  success: false,
  error: false
};

export const apiStateLoading: APIState = {
  loading: true,
  success: false,
  error: false
};

export const apiStateSuccess: APIState = {
  loading: false,
  success: true,
  error: false
};

export const apiStateError: APIState = {
  loading: false,
  success: false,
  error: true
};

export type S3Object = {
  key: string,
  url: string,
  urlState: APIState
};

