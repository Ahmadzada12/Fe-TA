<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Donasi</div>
    </div>
    <div>
      <n-form>
        <n-form-item label="Judul Donasi">
          <n-input />
        </n-form-item>
        <div class="flex flex-row">
          <div class="w-1/2 mr-4">
            <n-form-item label="Kategori">
            <n-select />
          </n-form-item>
          </div>
          <div class="w-1/2">
            <n-form-item label="Donasi Target">
          <n-input />
            </n-form-item>
          </div>
        </div>
        <n-form-item label="Content">
          <n-input type="textarea" />
        </n-form-item>
        <n-form-item>
          <n-upload
            multiple
            directory-dnd
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :max="5"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <i-mdi-image />
                </n-icon>
              </div>
              <n-text style="font-size: 16px">
                Click or drag a file to this area to upload
              </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0">
                Strictly prohibit from uploading sensitive information. For
                example, your bank card PIN or your credit card expiry date.
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
        <div class="flex justify-end gap-5">
          <n-button>Cancel</n-button>
          <n-button type="primary" attr-type="submit">Submit</n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>
