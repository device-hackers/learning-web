This repo is created to demonstrate infra failure on rover install (version 0.14.0 - 0.22.0).

It was working in our CI 01.08.2025 and stopped working 04.08.2025.

Just clone and try to `pnpm install` to see this failure:

```
/@apollo/rover: Running postinstall script, failed
One or more of the parameters you passed to the Binary constructor are invalid:
│ You must specify the version of your binary
│ Correct usage: new Binary("my-binary", "https://example.com/binary/download.tar.gz", "v1.0.0")
```

Newer versions install without any problems.