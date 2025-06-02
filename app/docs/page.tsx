import { Button } from "@heroui/button";

import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Docs</h1>
      <Button color="primary">Button</Button>
    </div>
  );
}
