export const sql = () => `set hive.exec.orc.split.strategy=BI;

drop table if exists tmp.tmp_record_info_sql;
create table if not exists tmp.tmp_record_info_sql as
select 
    t2.database_name
    ,t2.table_id
    ,t1.table_name
    ,if(t1.pid='' ,'-911',nvl(pid,'-911'))  as pid
    ,if(t1.dp in ('','__HIVE_DEFAULT_PARTITION__'),'-911',nvl(dp,'-911'))  as dp
    ,if(t1.evt_id='','-911',nvl(evt_id,'-911'))  as evt_id
    ,t1.line_cnt    as evt_records
    ,t2.day_rise_records
    ,t2.day_rise_size
    ,t2.day_rise_size_desc
    ,t2.total_records
    ,t2.total_size
    ,t2.total_size_desc
from
(
    select
        'stg_log_dp_alliance_base_log_hi' table_name
        ,get_json_object(data,'$.evt_id') evt_id
        ,get_json_object(data,'$.pid') pid
        ,get_json_object(data,'$.dp') dp
        ,count(*) line_cnt
    from stg.stg_log_dp_alliance_base_log_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by get_json_object(data,'$.evt_id')
        ,get_json_object(data,'$.pid')
        ,get_json_object(data,'$.dp')
        


    union all

    select
        'stg_log_dp_lj_base_log_hi' table_name
        ,get_json_object(data,'$.evt_id') evt_id
        ,get_json_object(data,'$.pid') pid
        ,get_json_object(data,'$.dp') dp
        ,count(*) line_cnt
    from stg.stg_log_dp_lj_base_log_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by get_json_object(data,'$.evt_id')
        ,get_json_object(data,'$.pid')
        ,get_json_object(data,'$.dp')

    union all

    select
        'stg_log_dp_bigc_base_log_hi' table_name
        ,get_json_object(data,'$.evt_id') evt_id
        ,get_json_object(data,'$.pid') pid
        ,get_json_object(data,'$.dp') dp
        ,count(*) line_cnt
    from stg.stg_log_dp_bigc_base_log_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by get_json_object(data,'$.evt_id')
        ,get_json_object(data,'$.pid')
        ,get_json_object(data,'$.dp')
        
    union all

    select
        'stg_log_dp_nts_base_log_hi' table_name
        ,get_json_object(data,'$.evt_id') evt_id
        ,get_json_object(data,'$.pid') pid
        ,get_json_object(data,'$.dp') dp
        ,count(*) line_cnt
    from stg.stg_log_dp_nts_base_log_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by get_json_object(data,'$.evt_id')
        ,get_json_object(data,'$.pid')
        ,get_json_object(data,'$.dp')
        
    union all

    select
        'stg_log_dp_delta_base_log_hi' table_name
        ,get_json_object(data,'$.evt_id') evt_id
        ,get_json_object(data,'$.pid') pid
        ,get_json_object(data,'$.dp') dp
        ,count(*) line_cnt
    from stg.stg_log_dp_delta_base_log_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by get_json_object(data,'$.evt_id')
        ,get_json_object(data,'$.pid')
        ,get_json_object(data,'$.dp')

    union all
        
    select
        'stg_log_dp_utopia_base_log_hi' table_name
        ,get_json_object(data,'$.evt_id') evt_id
        ,get_json_object(data,'$.pid') pid
        ,get_json_object(data,'$.dp') dp
        ,count(*) line_cnt
    from stg.stg_log_dp_utopia_base_log_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by get_json_object(data,'$.evt_id')
        ,get_json_object(data,'$.pid')
        ,get_json_object(data,'$.dp')
        
    union all
        
    select
        'stg_log_dp_common_base_log_hi' table_name
        ,get_json_object(data,'$.evt_id') evt_id
        ,get_json_object(data,'$.pid') pid
        ,get_json_object(data,'$.dp') dp
        ,count(*) line_cnt
    from stg.stg_log_dp_common_base_log_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by get_json_object(data,'$.evt_id')
        ,get_json_object(data,'$.pid')
        ,get_json_object(data,'$.dp')  
       

    union all
        
    select
        'dw_log_common_all_info_hi' table_name
        ,evt_id
        ,pid
        ,'-911' dp
        ,count(*) line_cnt
    from dw.dw_log_common_all_info_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid

    union all
        
    select
        'dw_log_delta_all_info_di' table_name
        ,evt_id
        ,pid
        ,'-911' dp
        ,count(*) line_cnt
    from dw.dw_log_delta_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid

    union all
        
    select
        'dw_log_nts_all_info_di' table_name
        ,evt_id
        ,pid
        ,'-911' dp
        ,count(*) line_cnt
    from dw.dw_log_nts_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid

    union all
        
    select
        'dw_log_common_all_info_di' table_name
        ,evt_id
        ,pid
        ,'-911' dp
        ,count(*) line_cnt
    from dw.dw_log_common_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid

    union all
        
    select
        'dw_log_bigc_all_info_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_bigc_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_dig_all_info_new_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_dig_all_info_new_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_alliance_all_info_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_alliance_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    
    union all
        
    select
        'dw_log_search_query_beike_lianjia_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_search_query_beike_lianjia_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_xinfang_search_query_detail_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_xinfang_search_query_detail_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_xinfang_search_query_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_xinfang_search_query_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_search_query_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_search_query_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_search_query_detail_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_search_query_detail_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_recommand_di' table_name
        ,evt_id
        ,'-911' pid
        ,'-911' dp
        ,count(*) line_cnt
    from dw.dw_log_recommand_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id

    union all
        
    select
        'dw_log_rent_bigc_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_rent_bigc_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_rent_bigc_search_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_rent_bigc_search_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_rent_search_query_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_rent_search_query_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
        
    select
        'dw_log_rushi_all_info_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_rushi_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
    

    select
        'dw_log_lj_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_lj_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all
    

    select
        'dw_log_nts_e_all_info_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_nts_e_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    
    union all

    select
        'dw_log_nts_p_all_info_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_nts_p_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp


    union all

    select
        'dw_log_exp_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_exp_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all

    select
        'dw_log_p_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_p_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all

    select
        'dw_log_e_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_e_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all

    select
        'dw_log_b_exp_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_b_exp_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all

    select
        'dw_log_b_p_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_b_p_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp

    union all

    select
        'dw_log_b_e_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_b_e_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp
    
    union all
    
    select
        'dw_log_commerce_flow_detail_di' table_name
        ,evt_id
        ,'-911' pid
        ,'-911' dp
        ,count(*) line_cnt
    from dw.dw_log_commerce_flow_detail_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id
    
    union all
        
    select
        'dw_log_utopia_all_info_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_utopia_all_info_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp
    
    union all
        
    select
        'dw_log_nts_all_info_hi' table_name
        ,evt_id
        ,pid
        ,'-911' dp
        ,count(*) line_cnt
    from dw.dw_log_nts_all_info_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid
    
 
    union all
        
    select
        'dw_log_delta_all_info_hi' table_name
        ,evt_id
        ,pid
        ,'-911' dp
        ,count(*) line_cnt
    from dw.dw_log_delta_all_info_hi
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid
    
    union all
        
    select
        'dw_log_b_visit_duration_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_b_visit_duration_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp
    
    union all
        
    select
        'dw_log_device_visit_duration_di' table_name
        ,evt_id
        ,pid
        ,dp
        ,count(*) line_cnt
    from dw.dw_log_device_visit_duration_di
    where pt >='20230416000000' and  pt < '20230417000000' 
    group by evt_id,pid,dp
    
) t1
left join 
(
    select table_id
        ,table_name
        ,database_name
        ,total_records
        ,total_size
        ,total_size_desc
        ,day_rise_records
        ,day_rise_size
        ,day_rise_size_desc
    from dwd.dwd_dq_table_detail_da
    where pt='20230416000000'
) t2 
on t1.table_name=t2.table_name;

set mapreduce.input.fileinputformat.split.minsize = 256000000;
set mapreduce.input.fileinputformat.split.maxsize = 512000000;

insert overwrite table dws.dws_dq_evt_record_info_da partition (pt='20230416000000')
select    
    database_name
    ,t1.table_id
    ,table_name
    ,pid
    ,dp
    ,evt_id
    ,evt_records
    ,round(cast(t1.evt_records as double)/t2.table_records,6) as evt_rate
    ,table_records day_rise_records
    ,day_rise_size
    ,day_rise_size_desc
    ,total_records
    ,total_size
    ,total_size_desc
from
(
    select
        database_name
        ,table_id
        ,table_name
        ,pid
        ,dp
        ,evt_id
        ,evt_records
        ,day_rise_records
        ,day_rise_size
        ,day_rise_size_desc
        ,total_records
        ,total_size
        ,total_size_desc
    from tmp.tmp_record_info_sql
) t1
left join 
(
    select 
        table_id
        ,sum(evt_records) table_records
    from tmp.tmp_record_info_sql
    group by table_id
) t2 
on t1.table_id=t2.table_id`;
