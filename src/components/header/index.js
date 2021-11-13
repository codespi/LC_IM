import React, { useState } from "react"
import { Button, message, Modal, Input, AutoComplete } from "antd"
import { reqLogOut } from "../../api"
import { useHistory } from "react-router";
import './index.less'




function Header() {

    const history = useHistory()

    const handleLogOut = async () => {

        const result = await reqLogOut('yys1234')
        if (result.code === "IM100011") {
            message.success(result.desc)
            history.replace('/login')
        }
        else {
            message.error(result.desc)
        }

    }

    function getRandomInt(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
      }
      
      const searchResult = (query) =>
        new Array(getRandomInt(5))
          .join('.')
          .split('.')
          .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
              value: category,
              label: (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>
                    Found {query} on{' '}
                    <a
                      href={`https://s.taobao.com/search?q=${query}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {category}
                    </a>
                  </span>
                  <span>{getRandomInt(200, 100)} results</span>
                </div>
              ),
            };
          });
      
        const [options, setOptions] = useState([]);
      
        const handleSearch = (value) => {
          setOptions(value ? searchResult(value) : []);
        };
      
        const onSelect = (value) => {
          console.log('onSelect', value);
        };


    return (
        <div className="header">
            <div className="header-left">
                <AutoComplete
                    dropdownMatchSelectWidth={252}
                    style={{
                        width: 300,
                    }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                >
                    <Input.Search size="large" placeholder="请输入" enterButton className="header-left-search"/>
                </AutoComplete>
            </div>
            <div className="header-right">
                <span>欢迎, yys1234</span>
                <Button onClick={handleLogOut} className="header-right-logOut">退出</Button>
            </div>

        </div>
    )
}

export default Header