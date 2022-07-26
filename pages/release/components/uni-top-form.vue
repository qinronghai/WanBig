<template>

</template>

<script>
export default {
  data() {
    return {
      addressRadio: true,
      price: '',
      area: '西区',
      floorNum: '',
      contact: ''
    };
  },
  methods: {
    radioChange(e) {
      this.area = e.detail.value;
    },
    handleContact(event) {
      let contact = event.detail.value;

      let wxReg = new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$"); //微信号正则校验   
      let qqReg = new RegExp("^[1-9][0-9]{4,9}$"); //QQ号正则校验   

      let flagWX = wxReg.test(contact);
      let flagQQ = qqReg.test(contact);

      if (flagWX) {
        let WX = '微信：' + contact;
        this.contact = WX;
      } else if (flagQQ) {
        let QQ = 'QQ：' + contact;
        this.contact = QQ;
      }

    },
    handlePrice(event) {
      let price = parseInt(event.detail.value);
      this.price = price;
    },
    handleAddress(event) {
      this.floorNum = event.detail.value;
    }
  },
  computed: {
    address: function () {
      return this.area + ' ' + this.floorNum
    }
  }
};
</script>
<style lang="scss" scoped>
.top-form {
  margin-top: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 25px 15px 0;
    font-size: 12px;
    font-weight: bold;

    .left {
      display: flex;
      align-items: center;

      .icon {
        width: 24px;
        height: 24px;
        margin-right: 15px;
      }

      .txt {
        font-size: 12px;
        text-align: center;
      }
    }

    .input {
      width: 80px;
      font-weight: 500;
      text-align: right;
    }
  }

  .top-form__item.address {
    padding-bottom: 15px;

    .left {
      .icon {
        width: 26px;
        height: 26px;
      }
    }

    .input {
      display: flex;
      align-items: center;
      width: auto;

      .radio {
        display: flex;
        align-items: center;

        .radio-west {
          // padding-right: 5px;
        }
      }

      .input__number {
        padding-left: 10px;

        .address-input {
          width: 80px;
        }
      }
    }
  }
}
</style>
