---
to: "src/services/<%= h.changeCase.kebab(h.component(name).name) %>.service.ts"
---
<%
    const importName = h.changeCase.pascal(h.component(name).name);
%>
import { injectable } from 'inversify';

@injectable()
export default class <%= importName %>Service {
}
