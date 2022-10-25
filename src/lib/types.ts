export type WbrOptions = {
  locales: ConstructorParameters<typeof Intl.Segmenter>[0]
  segmenterOptions?: Intl.SegmenterOptions
  asStr?: string
}
