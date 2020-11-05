import { Component, Vue } from '@/utils/vue-decorators';
import http from '@/utils/http'
@Component
export default class PageMixin extends Vue {
  public async initFormSelectOptionData() {
    // @ts-ignore
    for(let form of this.formProps) {
        if (form.optionSource) {
          const res = await http.get(form.optionSource);
          let data = res.data || [];
          if (form.optionValueKey) {
            data = data.map((item: any) => {
              return {
                value: item[form.optionValueKey],
                label: item[form.optionLabelKey]
              }
            })
          }
          form.options = data || [];
        }
    }
  }
  public async mounted() {
    await this.initFormSelectOptionData()
  }
}
